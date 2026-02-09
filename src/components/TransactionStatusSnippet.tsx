import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../lib/api'
import { mockGetRecentTransactions } from '../lib/mockApi'
import type { Transaction } from '../types'

const useApi = import.meta.env.VITE_API_URL

const STATUS_LABELS: Record<string, string> = {
  initiated: 'Pending approval',
  bank_verification: 'Bank verifying',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
}

export default function TransactionStatusSnippet() {
  const { token } = useAuth()
  const [latest, setLatest] = useState<Transaction | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!token) return
    let cancelled = false
    setLoading(true)
    const fetchRecent = async () => {
      try {
        if (useApi) {
          const list = await api.get<Transaction[]>('/api/transactions?limit=1')
          if (!cancelled && Array.isArray(list) && list.length > 0) setLatest(list[0])
        } else {
          const list = await mockGetRecentTransactions()
          if (!cancelled && list.length > 0) setLatest(list[0])
        }
      } catch {
        if (!cancelled) setLatest(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchRecent()
    return () => { cancelled = true }
  }, [token])

  if (!token) {
    return (
      <>
        <p className="text-sm text-gray-400 leading-relaxed mb-3">
          You request, your bank approves. No third-party in between.
        </p>
        <Link
          to="/"
          state={{ scrollTo: 'login' }}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-fxair-purple-light group-hover:gap-2 transition-all"
        >
          Sign in to see your transfer status
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </>
    )
  }

  const statusLabel = latest ? STATUS_LABELS[latest.status] ?? latest.status : null
  const statusColor =
    latest?.status === 'completed'
      ? 'text-emerald-400'
      : latest?.status === 'failed'
        ? 'text-red-400'
        : 'text-amber-400'

  return (
    <>
      {loading ? (
        <p className="text-sm text-gray-400 leading-relaxed mb-3">Loading your status…</p>
      ) : latest ? (
        <>
          <p className="text-sm text-gray-400 leading-relaxed mb-2">
            Your latest transfer
          </p>
          <p className={`text-sm font-semibold ${statusColor} mb-3`}>
            {statusLabel}
          </p>
          <p className="text-xs text-gray-500 mb-3">
            {latest.sourceAmount} {latest.sourceCurrency} → {latest.destinationAmount} {latest.destinationCurrency}
          </p>
        </>
      ) : (
        <p className="text-sm text-gray-400 leading-relaxed mb-3">
          You request, your bank approves. No third-party in between.
        </p>
      )}
      {token && (
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-fxair-purple-light group-hover:gap-2 transition-all">
          View all transactions
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      )}
    </>
  )
}
