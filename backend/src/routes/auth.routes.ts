import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { authLimiter } from '../middleware/rateLimit.js'
import * as authService from '../services/auth.service.js'

const router = Router()

router.post('/signup', authLimiter, async (req, res, next) => {
  try {
    const { email, password, username, firstName, lastName } = req.body
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password required' })
      return
    }
    const result = await authService.signup({
      email: String(email).trim(),
      password: String(password),
      username: username?.trim(),
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
    })
    res.status(201).json(result)
  } catch (e) {
    next(e)
  }
})

router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const { email, username, password } = req.body
    const emailOrUsername = (email ?? username)?.trim()
    if (!emailOrUsername || !password) {
      res.status(400).json({ message: 'Email/username and password required' })
      return
    }
    const result = await authService.login(emailOrUsername, String(password))
    res.json(result)
  } catch (e) {
    next(e)
  }
})

router.get('/me', authMiddleware, (req, res) => {
  const user = authService.getMe(req.user!.userId)
  if (!user) {
    res.status(404).json({ message: 'User not found' })
    return
  }
  res.json({ user })
})

export default router
