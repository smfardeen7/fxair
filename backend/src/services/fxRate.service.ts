/**
 * FX Rate Engine - Real-time rate fetching with cache and margin.
 * Production: use XE, OANDA, Bloomberg, or your liquidity provider.
 */

const RATE_CACHE = new Map<string, { rate: number; ts: number }>()
const CACHE_TTL_MS = 60 * 1000 // 1 minute
const DEFAULT_MARGIN = 0.005 // 0.5%

const FALLBACK_RATES: Record<string, number> = {
  'USD-EUR': 0.92,
  'EUR-USD': 1.087,
  'USD-GBP': 0.79,
  'GBP-USD': 1.265,
  'USD-INR': 83,
  'INR-USD': 0.012,
}

export async function getRate(from: string, to: string, margin = DEFAULT_MARGIN): Promise<{ rate: number; from: string; to: string; timestamp: number }> {
  const key = `${from}-${to}`
  const cached = RATE_CACHE.get(key)
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    const rateWithMargin = cached.rate * (1 - margin)
    return { rate: rateWithMargin, from, to, timestamp: cached.ts }
  }

  const apiKey = process.env.FX_RATE_API_KEY
  let rate: number
  if (apiKey && process.env.FX_RATE_API_URL) {
    try {
      const url = `${process.env.FX_RATE_API_URL}/${apiKey}/pair/${from}/${to}`
      const res = await fetch(url)
      const data = await res.json()
      if (data.result === 'success' && typeof data.conversion_rate === 'number') {
        rate = data.conversion_rate
      } else {
        rate = FALLBACK_RATES[key] ?? 0.92
      }
    } catch {
      rate = FALLBACK_RATES[key] ?? 0.92
    }
  } else {
    rate = FALLBACK_RATES[key] ?? (from === to ? 1 : 0.92)
  }

  RATE_CACHE.set(key, { rate, ts: Date.now() })
  const rateWithMargin = rate * (1 - margin)
  return { rate: rateWithMargin, from, to, timestamp: Date.now() }
}
