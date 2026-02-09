import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { config } from './config.js'
import { apiLimiter } from './middleware/rateLimit.js'
import { errorHandler } from './middleware/errorHandler.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import ratesRoutes from './routes/rates.routes.js'
import transactionsRoutes from './routes/transactions.routes.js'

const app = express()

app.use(helmet())
app.use(cors({ origin: config.frontendOrigin, credentials: true }))
app.use(express.json())
app.use(config.apiPrefix, apiLimiter)

app.use(`${config.apiPrefix}/auth`, authRoutes)
app.use(`${config.apiPrefix}/user`, userRoutes)
app.use(`${config.apiPrefix}/rates`, ratesRoutes)
app.use(`${config.apiPrefix}/transactions`, transactionsRoutes)
app.use(`${config.apiPrefix}/transfers`, transactionsRoutes)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`FXAir API listening on http://localhost:${config.port} (${config.nodeEnv})`)
  console.log(`  Auth:     POST ${config.apiPrefix}/auth/signup, POST ${config.apiPrefix}/auth/login, GET ${config.apiPrefix}/auth/me`)
  console.log(`  User:     GET ${config.apiPrefix}/user/stats, GET ${config.apiPrefix}/user/banks, POST ${config.apiPrefix}/user/banks`)
  console.log(`  Rates:    GET ${config.apiPrefix}/rates?from=USD&to=EUR`)
  console.log(`  Transfers: GET/POST ${config.apiPrefix}/transactions`)
})
