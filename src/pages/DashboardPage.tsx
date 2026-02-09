import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { DashboardStats, Transaction } from '../types'
import { api } from '../lib/api'
import { mockGetDashboardStats, mockGetRecentTransactions } from '../lib/mockApi'

const useApi = import.meta.env.VITE_API_URL

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    const load = async () => {
      try {
        if (useApi) {
          const [s, t] = await Promise.all([
            api.get<DashboardStats>('/api/user/stats'),
            api.get<Transaction[]>('/api/transactions?limit=10'),
          ])
          if (!cancelled) {
            setStats(s)
            setTransactions(Array.isArray(t) ? t : [])
          }
        } else {
          const [s, t] = await Promise.all([
            mockGetDashboardStats(),
            mockGetRecentTransactions(),
          ])
          if (!cancelled) {
            setStats(s)
            setTransactions(t)
          }
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-black pt-24 pb-20 flex items-center justify-center">
        <div className="text-fxair-purple-light font-medium">Loading dashboard...</div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black pt-24 pb-20 flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-white mb-8">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-sm text-gray-400 mb-1">Total sent</p>
            <p className="text-2xl font-bold text-white">
              {stats?.totalSentCurrency} {stats?.totalSent?.toLocaleString() ?? '0'}
            </p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-sm text-gray-400 mb-1">Transactions</p>
            <p className="text-2xl font-bold text-white">{stats?.transactionCount ?? 0}</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-sm text-gray-400 mb-1">Pending</p>
            <p className="text-2xl font-bold text-fxair-purple-light">{stats?.pendingCount ?? 0}</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-sm text-gray-400 mb-1">Saved vs banks</p>
            <p className="text-2xl font-bold text-green-400">
              {stats?.savedVsBankCurrency} {stats?.savedVsBank?.toFixed(2) ?? '0'}
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-3 mb-10">
          <Link
            to="/transfer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-fxair-purple text-white font-semibold hover:bg-fxair-purple-light transition-colors"
          >
            New transfer
          </Link>
          <Link
            to="/transactions"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-600 text-gray-300 font-medium hover:bg-gray-800 transition-colors"
          >
            View history
          </Link>
          <Link
            to="/banks"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-600 text-gray-300 font-medium hover:bg-gray-800 transition-colors"
          >
            Manage banks
          </Link>
        </div>

        {/* Recent transactions */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden">
          <h2 className="font-semibold text-white p-4 border-b border-gray-800">Recent transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-gray-800">
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Currency</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-gray-500 text-center">
                      No transactions yet. Start with a new transfer.
                    </td>
                  </tr>
                ) : (
                  transactions.slice(0, 5).map((tx) => (
                    <tr key={tx.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <td className="p-4 text-gray-300">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-white font-medium">
                        {tx.sourceAmount.toLocaleString()} {tx.sourceCurrency} → {tx.destinationAmount.toFixed(2)} {tx.destinationCurrency}
                      </td>
                      <td className="p-4 text-gray-400">
                        {tx.sourceCurrency} → {tx.destinationCurrency}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            tx.status === 'completed'
                              ? 'bg-green-500/20 text-green-400'
                              : tx.status === 'failed'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-fxair-purple/20 text-fxair-purple-light'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <Link to={`/transactions/${tx.id}`} className="text-fxair-purple-light text-sm hover:underline">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
