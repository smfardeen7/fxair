import { Router } from 'express'
import { getRate } from '../services/fxRate.service.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const from = (req.query.from as string)?.toUpperCase()?.slice(0, 3) ?? 'USD'
    const to = (req.query.to as string)?.toUpperCase()?.slice(0, 3) ?? 'EUR'
    const result = await getRate(from, to)
    res.json(result)
  } catch (e) {
    next(e)
  }
})

export default router
