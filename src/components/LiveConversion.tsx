import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { mockGetFxRate } from '../lib/mockApi'

const useApi = import.meta.env.VITE_API_URL
const ratesApiUrl = (import.meta.env.VITE_RATES_API_URL || '').replace(/\/$/, '')
const RATE_MARGIN = 0.005

const CURRENCIES = ['USD', 'EUR', 'GBP', 'CHF', 'INR']

interface FetchMultiResponse {
  base: string
  results: Record<string, number>
  updated: string
  ms: number
}

export default function LiveConversion() {
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [amount, setAmount] = useState('1000')
  const [rate, setRate] = useState<number | null>(null)
  const [ratesByTo, setRatesByTo] = useState<Record<string, number>>({})
  const [updated, setUpdated] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (fromCurrency === toCurrency) {
      setRate(1)
      setLoading(false)
      setError(false)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(false)
    const fetchRate = async () => {
      try {
        if (ratesApiUrl) {
          const toList = CURRENCIES.filter((c) => c !== fromCurrency).join(',')
          const url = `${ratesApiUrl}/fetch-multi?from=${encodeURIComponent(fromCurrency)}&to=${encodeURIComponent(toList)}`
          const res = await fetch(url)
          if (!res.ok) throw new Error('Rate fetch failed')
          const data: FetchMultiResponse = await res.json()
          if (cancelled) return
          setRatesByTo(data.results || {})
          setUpdated(data.updated || null)
          const r = data.results?.[toCurrency]
          setRate(r != null ? r : null)
        } else if (useApi) {
          const res = await api.get<{ rate: number }>(
            `/api/rates?from=${fromCurrency}&to=${toCurrency}`
          )
          if (!cancelled) setRate(res.rate)
        } else {
          const res = await mockGetFxRate(fromCurrency, toCurrency)
          if (!cancelled) setRate(res.rate)
        }
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchRate()
    const interval = setInterval(fetchRate, 60000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [fromCurrency, ratesApiUrl ? undefined : toCurrency])

  useEffect(() => {
    if (fromCurrency === toCurrency) {
      setRate(1)
      return
    }
    if (ratesApiUrl && ratesByTo[toCurrency] != null) {
      setRate(ratesByTo[toCurrency])
    }
  }, [toCurrency, fromCurrency, ratesApiUrl, ratesByTo])

  const amountNum = parseFloat(amount) || 0
  const ourRate = rate != null ? rate * (1 - RATE_MARGIN) : null
  const converted = ourRate != null ? amountNum * ourRate : 0

  return (
    <div className="mt-4 pt-4 border-t border-gray-800">
      <p className="text-xs text-gray-500 mb-2">
        Live rate
        {updated && (
          <span className="ml-2 text-gray-600">
            · Updated {new Date(updated).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </p>
      {loading ? (
        <p className="text-sm text-gray-400">Loading rate…</p>
      ) : error ? (
        <p className="text-sm text-amber-400">Rate unavailable</p>
      ) : rate != null ? (
        <>
          <p className="text-sm text-fxair-purple-light font-medium mb-3">
            1 {fromCurrency} = {(ourRate ?? 0).toFixed(4)} {toCurrency}
          </p>
          <div className="space-y-2">
            <label className="block text-xs text-gray-500">Amount</label>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="number"
                min="0"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-24 px-2.5 py-1.5 rounded-lg bg-black border border-gray-700 text-white text-sm focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
              />
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-black border border-gray-700 text-white text-sm focus:border-fxair-purple"
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <span className="text-gray-500 text-sm">→</span>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-black border border-gray-700 text-white text-sm focus:border-fxair-purple"
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-sm text-white font-semibold mt-3">
            You get: <span className="text-fxair-purple-light">{converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}</span>
          </p>
        </>
      ) : null}
    </div>
  )
}
