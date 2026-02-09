import type { BankConnection } from '../types.js'

const store = new Map<string, BankConnection>()

export function findByUserId(userId: string): BankConnection[] {
  return [...store.values()].filter((b) => b.userId === userId)
}

export function findById(id: string): BankConnection | undefined {
  return store.get(id)
}

export function create(bank: Omit<BankConnection, 'createdAt' | 'updatedAt'>): BankConnection {
  const now = new Date()
  const full: BankConnection = {
    ...bank,
    createdAt: now,
    updatedAt: now,
  }
  store.set(bank.id, full)
  return full
}

export function deleteById(id: string): boolean {
  return store.delete(id)
}
