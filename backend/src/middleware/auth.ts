import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config.js'
import type { JwtPayload } from '../types.js'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing or invalid Authorization header' })
    return
  }
  const token = header.slice(7)
  try {
    const payload = jwt.verify(token, config.jwt.secret) as JwtPayload
    req.user = payload
    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}
