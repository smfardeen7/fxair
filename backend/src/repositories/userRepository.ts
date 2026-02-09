import type { User } from '../types.js'

const store = new Map<string, User>()

export function findByEmail(email: string): User | undefined {
  return [...store.values()].find((u) => u.email.toLowerCase() === email.toLowerCase())
}

export function findByUsername(username: string): User | undefined {
  return [...store.values()].find((u) => u.username?.toLowerCase() === username.toLowerCase())
}

export function findById(id: string): User | undefined {
  return store.get(id)
}

export function create(user: Omit<User, 'createdAt' | 'updatedAt'>): User {
  const now = new Date()
  const full: User = {
    ...user,
    createdAt: now,
    updatedAt: now,
  }
  store.set(user.id, full)
  return full
}

export function update(id: string, patch: Partial<Pick<User, 'kycStatus' | 'updatedAt'>>): User | undefined {
  const u = store.get(id)
  if (!u) return undefined
  const updated = { ...u, ...patch, updatedAt: new Date() }
  store.set(id, updated)
  return updated
}
