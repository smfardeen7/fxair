import rateLimit from 'express-rate-limit'
import { config } from '../config.js'

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: 'Too many requests' },
  standardHeaders: true,
  legacyHeaders: false,
})

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Too many login/signup attempts' },
  standardHeaders: true,
  legacyHeaders: false,
})
