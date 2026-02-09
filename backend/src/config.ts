import 'dotenv/config'

export const config = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  apiPrefix: process.env.API_PREFIX ?? '/api',
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
  jwt: {
    secret: process.env.JWT_SECRET ?? 'dev-secret-change-in-production-min-32-chars',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  fxRate: {
    apiKey: process.env.FX_RATE_API_KEY,
    apiUrl: process.env.FX_RATE_API_URL ?? 'https://v6.exchangerate-api.com/v6',
  },
  plaid: {
    clientId: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
  },
}
