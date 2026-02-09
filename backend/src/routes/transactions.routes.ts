import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import * as transactionService from '../services/transaction.service.js'
import * as bankRepo from '../repositories/bankConnectionRepository.js'

const router = Router()

router.get('/', authMiddleware, (req, res) => {
  const limit = Math.min(parseInt(req.query.limit as string) || 50, 100)
  const list = transactionService.listByUser(req.user!.userId, limit)
  res.json(
    list.map((t) => ({
      ...t,
      createdAt: t.createdAt.toISOString(),
      completedAt: t.completedAt?.toISOString(),
      updatedAt: t.updatedAt.toISOString(),
      sourceBankName: bankRepo.findById(t.sourceBankId)?.bankName,
      destinationBankName: bankRepo.findById(t.destinationBankId)?.bankName,
    }))
  )
})

router.get('/:id', authMiddleware, (req, res) => {
  const tx = transactionService.getById(req.params.id, req.user!.userId)
  if (!tx) {
    res.status(404).json({ message: 'Transaction not found' })
    return
  }
  const sourceBank = bankRepo.findById(tx.sourceBankId)
  const destBank = bankRepo.findById(tx.destinationBankId)
  res.json({
    ...tx,
    createdAt: tx.createdAt.toISOString(),
    completedAt: tx.completedAt?.toISOString(),
    updatedAt: tx.updatedAt.toISOString(),
    sourceBankName: sourceBank?.bankName,
    destinationBankName: destBank?.bankName,
  })
})

router.post('/', authMiddleware, (req, res, next) => {
  try {
    const {
      sourceAmount,
      sourceCurrency,
      destinationCurrency,
      sourceBankId,
      destinationBankId,
      exchangeRate,
      feePercentage,
      destinationAmount,
      feeAmount,
    } = req.body
    if (
      sourceAmount == null ||
      !sourceCurrency ||
      !destinationCurrency ||
      !sourceBankId ||
      !destinationBankId ||
      exchangeRate == null ||
      feePercentage == null ||
      destinationAmount == null ||
      feeAmount == null
    ) {
      res.status(400).json({ message: 'Missing required transfer fields' })
      return
    }
    const tx = transactionService.create({
      userId: req.user!.userId,
      sourceBankId,
      destinationBankId,
      sourceAmount: Number(sourceAmount),
      sourceCurrency: String(sourceCurrency),
      destinationCurrency: String(destinationCurrency),
      exchangeRate: Number(exchangeRate),
      feePercentage: Number(feePercentage),
      destinationAmount: Number(destinationAmount),
      feeAmount: Number(feeAmount),
    })
    const sourceBank = bankRepo.findById(tx.sourceBankId)
    const destBank = bankRepo.findById(tx.destinationBankId)
    res.status(201).json({
      id: tx.id,
      ...tx,
      createdAt: tx.createdAt.toISOString(),
      updatedAt: tx.updatedAt.toISOString(),
      sourceBankName: sourceBank?.bankName,
      destinationBankName: destBank?.bankName,
    })
  } catch (e) {
    next(e)
  }
})

export default router
