/**
 * Ledger System - Double-entry bookkeeping for financial accuracy.
 * Production: every movement of funds must debit one account and credit another.
 */

import type { Transaction } from '../types.js'

export function ledgerRecord(tx: Transaction): void {
  if (process.env.NODE_ENV !== 'test') {
    console.info('[LEDGER]', {
      transactionId: tx.id,
      debit: { account: tx.sourceBankId, amount: tx.sourceAmount, currency: tx.sourceCurrency },
      credit: { account: tx.destinationBankId, amount: tx.destinationAmount, currency: tx.destinationCurrency },
      fee: tx.feeAmount,
      at: new Date().toISOString(),
    })
  }
  // TODO: INSERT ledger_entries (debit source, credit destination, fee to revenue account)
}
