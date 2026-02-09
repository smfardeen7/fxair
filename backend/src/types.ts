export type KycStatus = 'pending' | 'verified' | 'rejected'

export type TransactionStatus =
  | 'initiated'
  | 'bank_verification'
  | 'processing'
  | 'completed'
  | 'failed'

export interface User {
  id: string
  email: string
  username?: string
  passwordHash: string
  firstName?: string
  lastName?: string
  phone?: string
  country?: string
  kycStatus: KycStatus
  createdAt: Date
  updatedAt: Date
}

export interface UserPublic {
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

export interface BankConnection {
  id: string
  userId: string
  bankName: string
  accountLast4: string
  routingNumber?: string
  accountHolderName: string
  currency: string
  country: string
  verified: boolean
  createdAt: Date
  updatedAt: Date
}

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
  externalReference?: string
  estimatedCompletionAt?: Date
  createdAt: Date
  completedAt?: Date
  updatedAt: Date
}

export interface JwtPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}
