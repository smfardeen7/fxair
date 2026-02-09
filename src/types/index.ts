export type KycStatus = 'pending' | 'verified' | 'rejected'

export interface User {
  id: string
  email: string
  username?: string
  firstName?: string
  lastName?: string
  phone?: string
  country?: string
  kycStatus: KycStatus
  createdAt: string
}

export type TransactionStatus =
  | 'initiated'
  | 'bank_verification'
  | 'processing'
  | 'completed'
  | 'failed'

export interface Transaction {
  id: string
  userId: string
  sourceBankId: string
  destinationBankId: string
  sourceAmount: number
  sourceCurrency: string
  destinationAmount: number
  destinationCurrency: string
  exchangeRate: number
  feeAmount: number
  feePercentage: number
  status: TransactionStatus
  estimatedCompletionDate?: string
  createdAt: string
  completedAt?: string
  sourceBankName?: string
  destinationBankName?: string
}

export interface BankAccount {
  id: string
  userId: string
  bankName: string
  accountNumberLast4: string
  routingNumber?: string
  accountHolderName: string
  currency: string
  country: string
  verified: boolean
  createdAt: string
}

export interface DashboardStats {
  totalSent: number
  totalSentCurrency: string
  transactionCount: number
  pendingCount: number
  savedVsBank: number
  savedVsBankCurrency: string
}

export interface FxRateResponse {
  rate: number
  from: string
  to: string
  timestamp?: number
}

export interface TransferRequest {
  sourceAmount: number
  sourceCurrency: string
  destinationCurrency: string
  sourceBankId: string
  destinationBankId: string
  exchangeRate: number
  feePercentage: number
}
