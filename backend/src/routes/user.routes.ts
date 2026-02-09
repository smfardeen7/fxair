import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import * as bankRepo from '../repositories/bankConnectionRepository.js'
import * as transactionService from '../services/transaction.service.js'
import { randomUUID } from 'crypto'

const router = Router()
router.use(authMiddleware)

router.get('/stats', (req, res) => {
  const stats = transactionService.getStats(req.user!.userId)
  res.json(stats)
})

router.get('/banks', (req, res) => {
  const banks = bankRepo.findByUserId(req.user!.userId)
  res.json(
    banks.map((b) => ({
      id: b.id,
      userId: b.userId,
      bankName: b.bankName,
      accountNumberLast4: b.accountLast4,
      accountHolderName: b.accountHolderName,
      currency: b.currency,
      country: b.country,
      verified: b.verified,
      createdAt: b.createdAt.toISOString(),
    }))
  )
})

router.post('/banks', async (req, res, next) => {
  try {
    const { bankName, accountNumber, routingNumber, accountHolderName, currency, country } = req.body
    if (!bankName || !accountNumber || !accountHolderName) {
      res.status(400).json({ message: 'Bank name, account number, and holder name required' })
      return
    }
    const last4 = String(accountNumber).slice(-4)
    const bank = bankRepo.create({
      id: randomUUID(),
      userId: req.user!.userId,
      bankName: String(bankName),
      accountLast4: last4,
      routingNumber: routingNumber?.trim(),
      accountHolderName: String(accountHolderName),
      currency: (currency ?? 'USD').toUpperCase().slice(0, 3),
      country: (country ?? 'US').toUpperCase().slice(0, 2),
      verified: false,
    })
    res.status(201).json({
      id: bank.id,
      userId: bank.userId,
      bankName: bank.bankName,
      accountNumberLast4: bank.accountLast4,
      accountHolderName: bank.accountHolderName,
      currency: bank.currency,
      country: bank.country,
      verified: bank.verified,
      createdAt: bank.createdAt.toISOString(),
    })
  } catch (e) {
    next(e)
  }
})

export default router
