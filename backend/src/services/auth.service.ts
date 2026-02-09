import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'
import { config } from '../config.js'
import * as userRepo from '../repositories/userRepository.js'
import type { UserPublic, JwtPayload } from '../types.js'

const SALT_ROUNDS = 10

function toPublic(u: { id: string; email: string; username?: string; firstName?: string; lastName?: string; phone?: string; country?: string; kycStatus: string; createdAt: Date }): UserPublic {
  return {
    id: u.id,
    email: u.email,
    username: u.username,
    firstName: u.firstName,
    lastName: u.lastName,
    phone: u.phone,
    country: u.country,
    kycStatus: u.kycStatus as UserPublic['kycStatus'],
    createdAt: u.createdAt.toISOString(),
  }
}

export async function signup(params: {
  email: string
  password: string
  username?: string
  firstName?: string
  lastName?: string
}): Promise<{ token: string; user: UserPublic }> {
  const existing = userRepo.findByEmail(params.email)
  if (existing) throw new Error('Email already registered')
  if (params.username && userRepo.findByUsername(params.username)) {
    throw new Error('Username already taken')
  }
  const passwordHash = await bcrypt.hash(params.password, SALT_ROUNDS)
  const user = userRepo.create({
    id: randomUUID(),
    email: params.email,
    username: params.username,
    passwordHash,
    firstName: params.firstName,
    lastName: params.lastName,
    kycStatus: 'pending',
  })
  const token = jwt.sign(
    { userId: user.id, email: user.email } as JwtPayload,
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  )
  return { token, user: toPublic(user) }
}

export async function login(emailOrUsername: string, password: string): Promise<{ token: string; user: UserPublic }> {
  const user = userRepo.findByEmail(emailOrUsername) ?? userRepo.findByUsername(emailOrUsername)
  if (!user) throw new Error('Invalid credentials')
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) throw new Error('Invalid credentials')
  const token = jwt.sign(
    { userId: user.id, email: user.email } as JwtPayload,
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  )
  return { token, user: toPublic(user) }
}

export function getMe(userId: string): UserPublic | null {
  const user = userRepo.findById(userId)
  return user ? toPublic(user) : null
}
