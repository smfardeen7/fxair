import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { BankAccount, FxRateResponse } from '../types'
import { api } from '../lib/api'
import {
  mockGetFxRate,
  mockGetBanks,
  mockCreateTransfer,
} from '../lib/mockApi'

const useApi = import.meta.env.VITE_API_URL
const FEE_PERCENT = 1
const RATE_MARGIN = 0.005

export default function TransferPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [sourceAmount, setSourceAmount] = useState('')
  const [sourceCurrency, setSourceCurrency] = useState('USD')
  const [destinationCurrency, setDestinationCurrency] = useState('EUR')
  const [rate, setRate] = useState<number | null>(null)
  const [rateLoading, setRateLoading] = useState(false)
  const [banks, setBanks] = useState<BankAccount[]>([])
  const [sourceBankId, setSourceBankId] = useState('')
  const [destinationBankId, setDestinationBankId] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const amountNum = parseFloat(sourceAmount) || 0
  const ourRate = rate != null ? rate * (1 - RATE_MARGIN) : null
  const convertedAmount = ourRate != null ? amountNum * ourRate : 0
  const feeAmount = convertedAmount * (FEE_PERCENT / 100)
  const finalAmount = convertedAmount - feeAmount

  useEffect(() => {
    let cancelled = false
    const loadBanks = async () => {
      try {
        if (useApi) {
          const data = await api.get<BankAccount[]>('/api/user/banks')
          if (!cancelled) setBanks(Array.isArray(data) ? data : [])
        } else {
          const data = await mockGetBanks()
          if (!cancelled) setBanks(data)
        }
      } catch {
        if (!cancelled) setBanks([])
      }
    }
    loadBanks()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!sourceCurrency || !destinationCurrency || sourceCurrency === destinationCurrency) {
      setRate(null)
      return
    }
    let cancelled = false
    setRateLoading(true)
    const fetchRate = async () => {
      try {
        if (useApi) {
          const res = await api.get<FxRateResponse>(
            `/api/rates?from=${sourceCurrency}&to=${destinationCurrency}`
          )
          if (!cancelled) setRate(res.rate)
        } else {
          const res = await mockGetFxRate(sourceCurrency, destinationCurrency)
          if (!cancelled) setRate(res.rate)
        }
      } catch {
        if (!cancelled) setRate(null)
      } finally {
        if (!cancelled) setRateLoading(false)
      }
    }
    fetchRate()
    const interval = setInterval(fetchRate, 30000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [sourceCurrency, destinationCurrency])

  const handleSubmit = async () => {
    setError('')
    if (amountNum <= 0) {
      setError('Enter a valid amount')
      return
    }
    if (!sourceBankId || !destinationBankId) {
      setError('Select source and destination banks')
      return
    }
    if (sourceBankId === destinationBankId) {
      setError('Source and destination must be different')
      return
    }
    if (ourRate == null) {
      setError('Exchange rate not available')
      return
    }
    setSubmitting(true)
    try {
      if (useApi) {
        const tx = await api.post<{ id: string }>('/api/transfers', {
          sourceAmount: amountNum,
          sourceCurrency,
          destinationCurrency,
          sourceBankId,
          destinationBankId,
          exchangeRate: ourRate,
          feePercentage: FEE_PERCENT,
          destinationAmount: finalAmount,
          feeAmount,
        })
        navigate(`/transactions/${tx.id}`)
      } else {
        const tx = await mockCreateTransfer({
          sourceAmount: amountNum,
          sourceCurrency,
          destinationCurrency,
          sourceBankId,
          destinationBankId,
          exchangeRate: ourRate,
          feePercentage: FEE_PERCENT,
          destinationAmount: finalAmount,
          feeAmount,
        })
        navigate(`/transactions/${tx.id}`)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Transfer failed')
    } finally {
      setSubmitting(false)
    }
  }

  const sourceBanks = banks.filter((b) => b.currency === sourceCurrency)
  const destBanks = banks.filter((b) => b.currency === destinationCurrency)

  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-white mb-8">New transfer</h1>

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">You send</label>
              <input
                type="number"
                min="1"
                step="any"
                value={sourceAmount}
                onChange={(e) => setSourceAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">From currency</label>
              <select
                value={sourceCurrency}
                onChange={(e) => setSourceCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">To currency</label>
              <select
                value={destinationCurrency}
                onChange={(e) => setDestinationCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
              </select>
            </div>
            {rateLoading && <p className="text-gray-400 text-sm">Fetching rate...</p>}
            {rate != null && amountNum > 0 && (
              <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 text-sm text-gray-300">
                <p>Rate: 1 {sourceCurrency} = {(ourRate ?? 0).toFixed(4)} {destinationCurrency}</p>
                <p className="mt-1 text-white font-medium">
                  Recipient gets: {finalAmount.toFixed(2)} {destinationCurrency} (fee {FEE_PERCENT}% included)
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={amountNum <= 0 || rate == null}
              className="w-full py-3 rounded-xl bg-fxair-purple text-white font-semibold hover:bg-fxair-purple-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 space-y-2 text-sm">
              <h3 className="font-semibold text-white mb-2">Transfer breakdown</h3>
              <p className="text-gray-400">You send: <span className="text-white">{amountNum.toLocaleString()} {sourceCurrency}</span></p>
              <p className="text-gray-400">Our rate: <span className="text-white">{(ourRate ?? 0).toFixed(4)}</span></p>
              <p className="text-gray-400">Converted: <span className="text-white">{convertedAmount.toFixed(2)} {destinationCurrency}</span></p>
              <p className="text-gray-400">Fee ({FEE_PERCENT}%): <span className="text-white">-{feeAmount.toFixed(2)} {destinationCurrency}</span></p>
              <p className="text-white font-semibold pt-2 border-t border-gray-700">Recipient gets: {finalAmount.toFixed(2)} {destinationCurrency}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Source bank (debited)</label>
              <select
                value={sourceBankId}
                onChange={(e) => setSourceBankId(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
              >
                <option value="">Select</option>
                {sourceBanks.map((b) => (
                  <option key={b.id} value={b.id}>{b.bankName} ****{b.accountNumberLast4} ({b.currency})</option>
                ))}
              </select>
              {sourceBanks.length === 0 && (
                <p className="mt-1 text-amber-400 text-sm">
                  <Link to="/banks" className="underline">Add a {sourceCurrency} bank</Link>
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Destination bank (credited)</label>
              <select
                value={destinationBankId}
                onChange={(e) => setDestinationBankId(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
              >
                <option value="">Select</option>
                {destBanks.map((b) => (
                  <option key={b.id} value={b.id}>{b.bankName} ****{b.accountNumberLast4} ({b.currency})</option>
                ))}
              </select>
              {destBanks.length === 0 && (
                <p className="mt-1 text-amber-400 text-sm">
                  <Link to="/banks" className="underline">Add a {destinationCurrency} bank</Link>
                </p>
              )}
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl border border-gray-600 text-gray-300 font-medium hover:bg-gray-800"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || !sourceBankId || !destinationBankId}
                className="flex-1 py-3 rounded-xl bg-fxair-purple text-white font-semibold hover:bg-fxair-purple-light disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Confirm transfer'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
