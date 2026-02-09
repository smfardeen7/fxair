import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Transaction } from '../types'
import { api } from '../lib/api'
import { mockGetTransactions } from '../lib/mockApi'

const useApi = import.meta.env.VITE_API_URL

export default function TransactionsPage() {
  const [list, setList] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    const load = async () => {
      try {
        if (useApi) {
          const data = await api.get<Transaction[]>('/api/transactions')
          if (!cancelled) setList(Array.isArray(data) ? data : [])
        } else {
          const data = await mockGetTransactions()
          if (!cancelled) setList(data)
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
        <div className="text-fxair-purple-light font-medium">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-white">Transaction history</h1>
          <Link
            to="/transfer"
            className="px-5 py-2.5 rounded-xl bg-fxair-purple text-white font-semibold hover:bg-fxair-purple-light"
          >
            New transfer
          </Link>
        </div>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <div className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-gray-800">
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Pair</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {list.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-gray-500 text-center">
                      No transactions yet.
                    </td>
                  </tr>
                ) : (
                  list.map((tx) => (
                    <tr key={tx.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <td className="p-4 text-gray-300">{new Date(tx.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 text-white font-medium">
                        {tx.sourceAmount.toLocaleString()} {tx.sourceCurrency} → {tx.destinationAmount.toFixed(2)} {tx.destinationCurrency}
                      </td>
                      <td className="p-4 text-gray-400">{tx.sourceCurrency} → {tx.destinationCurrency}</td>
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
