/**
 * Transaction Processing Engine - State machine and persistence.
 * Production: integrate with SWIFT, payment processor, or correspondent bank.
 */

import { randomUUID } from 'crypto'
import * as transactionRepo from '../repositories/transactionRepository.js'
import * as bankRepo from '../repositories/bankConnectionRepository.js'
import type { Transaction, TransactionStatus } from '../types.js'
import { auditLog } from './audit.service.js'
import { notifyTransactionUpdate } from './notification.service.js'
import { ledgerRecord } from './ledger.service.js'

export function create(params: {
  userId: string
  sourceBankId: string
  destinationBankId: string
  sourceAmount: number
  sourceCurrency: string
  destinationCurrency: string
  exchangeRate: number
  feeAmount: number
  feePercentage: number
  destinationAmount: number
}): Transaction {
  const sourceBank = bankRepo.findById(params.sourceBankId)
  const destBank = bankRepo.findById(params.destinationBankId)
  if (!sourceBank || sourceBank.userId !== params.userId) throw new Error('Invalid source bank')
  if (!destBank || destBank.userId !== params.userId) throw new Error('Invalid destination bank')
  if (params.sourceBankId === params.destinationBankId) throw new Error('Source and destination must differ')

  const tx = transactionRepo.create({
    id: randomUUID(),
    userId: params.userId,
    sourceBankId: params.sourceBankId,
    destinationBankId: params.destinationBankId,
    sourceAmount: params.sourceAmount,
    sourceCurrency: params.sourceCurrency,
    destinationAmount: params.destinationAmount,
    destinationCurrency: params.destinationCurrency,
    exchangeRate: params.exchangeRate,
    feeAmount: params.feeAmount,
    feePercentage: params.feePercentage,
    status: 'initiated',
  })
  auditLog(params.userId, 'transaction.created', 'transaction', tx.id, { amount: params.sourceAmount, currency: params.sourceCurrency })
  notifyTransactionUpdate(tx.id, 'initiated')
  return tx
}

export function getById(id: string, userId: string): Transaction | null {
  const tx = transactionRepo.findById(id)
  if (!tx || tx.userId !== userId) return null
  return tx
}

export function listByUser(userId: string, limit = 50): Transaction[] {
  return transactionRepo.findByUserId(userId, limit)
}

export function getStats(userId: string): {
  totalSent: number
  totalSentCurrency: string
  transactionCount: number
  pendingCount: number
  savedVsBank: number
  savedVsBankCurrency: string
} {
  const all = transactionRepo.findByUserId(userId, 1000)
  const completed = all.filter((t) => t.status === 'completed')
  const totalSent = completed.reduce((s, t) => s + t.sourceAmount, 0)
  const totalDest = completed.reduce((s, t) => s + t.destinationAmount, 0)
  const traditionalRate = 0.92 * 0.95
  const traditionalDest = completed.reduce((s, t) => s + t.sourceAmount * traditionalRate, 0)
  return {
    totalSent,
    totalSentCurrency: 'USD',
    transactionCount: all.length,
    pendingCount: all.filter((t) => ['initiated', 'bank_verification', 'processing'].includes(t.status)).length,
    savedVsBank: Math.max(0, totalDest - traditionalDest),
    savedVsBankCurrency: completed[0]?.destinationCurrency ?? 'EUR',
  }
}

/** Advance state (production: trigger bank/SWIFT steps). */
export async function advanceStatus(txId: string, newStatus: TransactionStatus): Promise<Transaction | null> {
  const tx = transactionRepo.findById(txId)
  if (!tx) return null
  transactionRepo.updateStatus(txId, newStatus, newStatus === 'completed' || newStatus === 'failed' ? new Date() : undefined)
  const updated = transactionRepo.findById(txId)!
  if (newStatus === 'completed') {
    ledgerRecord(tx)
  }
  notifyTransactionUpdate(updated.id, newStatus)
  return updated
}
