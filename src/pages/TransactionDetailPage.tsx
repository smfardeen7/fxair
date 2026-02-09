import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Transaction } from '../types'
import { api } from '../lib/api'
import { mockGetTransaction } from '../lib/mockApi'

const useApi = import.meta.env.VITE_API_URL
const STATUS_PROGRESS: Record<string, number> = {
  initiated: 25,
  bank_verification: 50,
  processing: 75,
  completed: 100,
  failed: 0,
}
const STATUS_LABEL: Record<string, string> = {
  initiated: 'Transfer initiated',
  bank_verification: 'Verifying with your bank',
  processing: 'Processing transfer',
  completed: 'Completed',
  failed: 'Failed',
}

export default function TransactionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [tx, setTx] = useState<Transaction | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    let cancelled = false
    const fetchTx = async () => {
      try {
        if (useApi) {
          const data = await api.get<Transaction>(`/api/transactions/${id}`)
          if (!cancelled) setTx(data)
        } else {
          const data = await mockGetTransaction(id)
          if (!cancelled) setTx(data ?? null)
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Not found')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchTx()
    const interval = setInterval(fetchTx, 10000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [id])

  if (loading && !tx) {
    return (
      <main className="min-h-screen bg-black pt-24 pb-20 flex items-center justify-center">
        <div className="text-fxair-purple-light font-medium">Loading...</div>
      </main>
    )
  }

  if (error || !tx) {
    return (
      <main className="min-h-screen bg-black pt-24 pb-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          <p className="text-red-400 mb-4">{error || 'Transaction not found'}</p>
          <Link to="/transactions" className="text-fxair-purple-light hover:underline">Back to transactions</Link>
        </div>
      </main>
    )
  }

  const progress = STATUS_PROGRESS[tx.status] ?? 0
  const label = STATUS_LABEL[tx.status] ?? tx.status

  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <Link to="/transactions" className="text-sm text-gray-400 hover:text-fxair-purple-light mb-6 inline-block">
          ← Back to transactions
        </Link>

        <h1 className="font-display text-2xl font-bold text-white mb-6">Transaction details</h1>

        {/* Progress */}
        <div className="mb-8">
          <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                tx.status === 'failed' ? 'bg-red-500' : tx.status === 'completed' ? 'bg-green-500' : 'bg-fxair-purple'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm mt-2">{label}</p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 space-y-4 text-sm">
          <p><span className="text-gray-500">ID</span> <span className="text-white font-mono">{tx.id}</span></p>
          <p><span className="text-gray-500">You sent</span> <span className="text-white">{tx.sourceAmount.toLocaleString()} {tx.sourceCurrency}</span></p>
          <p><span className="text-gray-500">Recipient gets</span> <span className="text-white">{tx.destinationAmount.toFixed(2)} {tx.destinationCurrency}</span></p>
          <p><span className="text-gray-500">Rate</span> <span className="text-white">{tx.exchangeRate.toFixed(4)}</span></p>
          <p><span className="text-gray-500">Fee</span> <span className="text-white">{tx.feeAmount.toFixed(2)} {tx.destinationCurrency}</span></p>
          <p><span className="text-gray-500">From</span> <span className="text-white">{tx.sourceBankName ?? '—'}</span></p>
          <p><span className="text-gray-500">To</span> <span className="text-white">{tx.destinationBankName ?? '—'}</span></p>
          <p><span className="text-gray-500">Created</span> <span className="text-white">{new Date(tx.createdAt).toLocaleString()}</span></p>
          {tx.completedAt && (
            <p><span className="text-gray-500">Completed</span> <span className="text-white">{new Date(tx.completedAt).toLocaleString()}</span></p>
          )}
        </div>
      </div>
    </main>
  )
}
