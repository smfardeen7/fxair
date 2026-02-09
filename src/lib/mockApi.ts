/**
 * Mock API for development when no backend is set (VITE_API_URL empty).
 * Replace these with real api.get/post calls when backend is ready.
 */

import type { User, Transaction, BankAccount, DashboardStats, FxRateResponse } from '../types'

const MOCK_USER: User = {
  id: 'user-1',
  email: 'user@example.com',
  username: 'demo',
  firstName: 'Demo',
  lastName: 'User',
  phone: '+1234567890',
  country: 'US',
  kycStatus: 'verified',
  createdAt: new Date().toISOString(),
}

const MOCK_BANKS: BankAccount[] = [
  {
    id: 'bank-1',
    userId: 'user-1',
    bankName: 'Chase',
    accountNumberLast4: '4242',
    accountHolderName: 'Demo User',
    currency: 'USD',
    country: 'US',
    verified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'bank-2',
    userId: 'user-1',
    bankName: 'Deutsche Bank',
    accountNumberLast4: '8888',
    accountHolderName: 'Demo User',
    currency: 'EUR',
    country: 'DE',
    verified: true,
    createdAt: new Date().toISOString(),
  },
]

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    userId: 'user-1',
    sourceBankId: 'bank-1',
    destinationBankId: 'bank-2',
    sourceAmount: 1000,
    sourceCurrency: 'USD',
    destinationAmount: 906.25,
    destinationCurrency: 'EUR',
    exchangeRate: 0.9154,
    feeAmount: 9.15,
    feePercentage: 1,
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: new Date(Date.now() - 86000000).toISOString(),
    sourceBankName: 'Chase',
    destinationBankName: 'Deutsche Bank',
  },
  {
    id: 'tx-2',
    userId: 'user-1',
    sourceBankId: 'bank-1',
    destinationBankId: 'bank-2',
    sourceAmount: 500,
    sourceCurrency: 'USD',
    destinationAmount: 453.5,
    destinationCurrency: 'EUR',
    exchangeRate: 0.9154,
    feeAmount: 4.57,
    feePercentage: 1,
    status: 'processing',
    createdAt: new Date().toISOString(),
    sourceBankName: 'Chase',
    destinationBankName: 'Deutsche Bank',
  },
]

export async function mockAuthLogin(email: string, _password: string): Promise<{ token: string; user: User }> {
  await delay(400)
  return {
    token: 'mock-jwt-' + Date.now(),
    user: { ...MOCK_USER, email },
  }
}

export async function mockAuthSignup(payload: {
  email: string
  password: string
  username?: string
  firstName?: string
  lastName?: string
}): Promise<{ token: string; user: User }> {
  await delay(500)
  return {
    token: 'mock-jwt-' + Date.now(),
    user: {
      ...MOCK_USER,
      email: payload.email,
      username: payload.username,
      firstName: payload.firstName,
      lastName: payload.lastName,
    },
  }
}

export async function mockGetUser(): Promise<User> {
  await delay(200)
  return MOCK_USER
}

export async function mockGetDashboardStats(): Promise<DashboardStats> {
  await delay(300)
  const completed = MOCK_TRANSACTIONS.filter((t) => t.status === 'completed')
  const totalSent = completed.reduce((s, t) => s + t.sourceAmount, 0)
  const totalDest = completed.reduce((s, t) => s + t.destinationAmount, 0)
  const traditionalRate = 0.92 * 0.95
  const traditionalDest = completed.reduce((s, t) => s + t.sourceAmount * traditionalRate, 0)
  return {
    totalSent,
    totalSentCurrency: 'USD',
    transactionCount: MOCK_TRANSACTIONS.length,
    pendingCount: MOCK_TRANSACTIONS.filter((t) => t.status === 'initiated' || t.status === 'bank_verification' || t.status === 'processing').length,
    savedVsBank: Math.max(0, totalDest - traditionalDest),
    savedVsBankCurrency: 'EUR',
  }
}

export async function mockGetRecentTransactions(): Promise<Transaction[]> {
  await delay(250)
  return [...MOCK_TRANSACTIONS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 10)
}

export async function mockGetTransactions(): Promise<Transaction[]> {
  await delay(250)
  return [...MOCK_TRANSACTIONS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export async function mockGetTransaction(id: string): Promise<Transaction | null> {
  await delay(200)
  return MOCK_TRANSACTIONS.find((t) => t.id === id) || null
}

export async function mockGetBanks(): Promise<BankAccount[]> {
  await delay(200)
  return [...MOCK_BANKS]
}

export async function mockGetFxRate(from: string, to: string): Promise<FxRateResponse> {
  await delay(300)
  const pairs: Record<string, number> = {
    'USD-EUR': 0.92,
    'EUR-USD': 1.087,
    'USD-GBP': 0.79,
    'GBP-USD': 1.265,
    'USD-INR': 83,
    'INR-USD': 0.012,
  }
  const rate = pairs[`${from}-${to}`] ?? (from === to ? 1 : 0.92)
  return { rate, from, to, timestamp: Date.now() }
}

export async function mockCreateTransfer(payload: {
  sourceAmount: number
  sourceCurrency: string
  destinationCurrency: string
  sourceBankId: string
  destinationBankId: string
  exchangeRate: number
  feePercentage: number
  destinationAmount: number
  feeAmount: number
}): Promise<Transaction> {
  await delay(600)
  const tx: Transaction = {
    id: 'tx-' + Date.now(),
    userId: 'user-1',
    sourceBankId: payload.sourceBankId,
    destinationBankId: payload.destinationBankId,
    sourceAmount: payload.sourceAmount,
    sourceCurrency: payload.sourceCurrency,
    destinationAmount: payload.destinationAmount,
    destinationCurrency: payload.destinationCurrency,
    exchangeRate: payload.exchangeRate,
    feeAmount: payload.feeAmount,
    feePercentage: payload.feePercentage,
    status: 'initiated',
    createdAt: new Date().toISOString(),
    sourceBankName: 'Chase',
    destinationBankName: 'Deutsche Bank',
  }
  MOCK_TRANSACTIONS.unshift(tx)
  return tx
}

export async function mockAddBank(payload: {
  bankName: string
  accountNumber: string
  routingNumber?: string
  accountHolderName: string
  currency: string
  country: string
}): Promise<BankAccount> {
  await delay(400)
  const bank: BankAccount = {
    id: 'bank-' + Date.now(),
    userId: 'user-1',
    bankName: payload.bankName,
    accountNumberLast4: payload.accountNumber.slice(-4),
    routingNumber: payload.routingNumber,
    accountHolderName: payload.accountHolderName,
    currency: payload.currency,
    country: payload.country,
    verified: false,
    createdAt: new Date().toISOString(),
  }
  MOCK_BANKS.push(bank)
  return bank
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}
