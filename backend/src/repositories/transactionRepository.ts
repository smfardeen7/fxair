import type { Transaction } from '../types.js'

const store = new Map<string, Transaction>()

export function findById(id: string): Transaction | undefined {
  return store.get(id)
}

export function findByUserId(userId: string, limit = 50): Transaction[] {
  return [...store.values()]
    .filter((t) => t.userId === userId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)
}

export function create(tx: Omit<Transaction, 'createdAt' | 'updatedAt'>): Transaction {
  const now = new Date()
  const full: Transaction = {
    ...tx,
    createdAt: now,
    updatedAt: now,
  }
  store.set(tx.id, full)
  return full
}

export function updateStatus(
  id: string,
  status: Transaction['status'],
  completedAt?: Date
): Transaction | undefined {
  const t = store.get(id)
  if (!t) return undefined
  const updated = {
    ...t,
    status,
    completedAt: completedAt ?? t.completedAt,
    updatedAt: new Date(),
  }
  store.set(id, updated)
  return updated
}
