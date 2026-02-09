import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { BankAccount } from '../types'
import { api } from '../lib/api'
import { mockGetBanks, mockAddBank } from '../lib/mockApi'

const useApi = import.meta.env.VITE_API_URL

export default function DirectBankLinkPage() {
  const { token } = useAuth()
  const [banks, setBanks] = useState<BankAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    accountHolderName: '',
    currency: 'USD',
    country: 'US',
  })

  const loadBanks = async () => {
    try {
      if (useApi) {
        const data = await api.get<BankAccount[]>('/api/user/banks')
        setBanks(Array.isArray(data) ? data : [])
      } else {
        const data = await mockGetBanks()
        setBanks(data)
      }
    } catch {
      setBanks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      loadBanks()
    } else {
      setLoading(false)
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.bankName.trim() || !form.accountNumber.trim() || !form.accountHolderName.trim()) {
      setError('Please fill in bank name, account number, and account holder name.')
      return
    }
    setSubmitting(true)
    try {
      if (useApi) {
        await api.post('/api/user/banks', form)
      } else {
        await mockAddBank(form)
      }
      setForm({ bankName: '', accountNumber: '', routingNumber: '', accountHolderName: '', currency: 'USD', country: 'US' })
      setShowForm(false)
      await loadBanks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add bank')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black pt-24 pb-20 flex items-center justify-center">
        <div className="text-fxair-purple-light font-medium">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">Direct Bank Link</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Add the bank accounts you want to transfer between. When you make a transfer, you choose <span className="text-fxair-purple-light font-medium">which bank to send from</span> and <span className="text-fxair-purple-light font-medium">which bank to receive to</span>.
          </p>
        </div>

        {/* From → To visual hint */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 mb-8 flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="text-gray-500">Transfer flow:</span>
          <span className="px-3 py-1.5 rounded-lg bg-gray-800 text-white font-medium">Send from (source)</span>
          <span className="text-gray-500">→</span>
          <span className="px-3 py-1.5 rounded-lg bg-fxair-purple/20 text-fxair-purple-light font-medium">Receive to (destination)</span>
          <span className="text-gray-500 ml-1">— pick from your linked accounts below when you transfer.</span>
        </div>

        {/* Not logged in: show sign-in prompt */}
        {!token && (
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-10 text-center mb-8">
            <p className="text-gray-300 mb-2">Sign in to link your bank accounts</p>
            <p className="text-sm text-gray-500 mb-6">You need an account to add and manage your banks for transfers.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                state={{ scrollTo: 'login', from: { pathname: '/direct-bank-link' } }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-fxair-purple text-white font-semibold hover:bg-fxair-purple-light transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/open-account"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-600 text-gray-300 font-medium hover:bg-gray-800 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        )}

        {/* Add bank - only when logged in */}
        {token && (
        <>
        {/* Add bank */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold text-white">Your linked accounts</h2>
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 rounded-xl bg-fxair-purple text-white font-semibold hover:bg-fxair-purple-light transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add bank account'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 mb-8 space-y-4">
            <h3 className="font-semibold text-white">Bank details</h3>
            <p className="text-sm text-gray-500">
              This account can be used as <strong className="text-gray-400">send from</strong> or <strong className="text-gray-400">receive to</strong> depending on the currency and transfer you make.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Bank name</label>
                <input
                  value={form.bankName}
                  onChange={(e) => setForm((f) => ({ ...f, bankName: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  placeholder="e.g. Chase, Deutsche Bank"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Account number</label>
                <input
                  value={form.accountNumber}
                  onChange={(e) => setForm((f) => ({ ...f, accountNumber: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  placeholder="Full account number"
                  required
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Routing / SWIFT (optional)</label>
                <input
                  value={form.routingNumber}
                  onChange={(e) => setForm((f) => ({ ...f, routingNumber: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  placeholder="US routing or SWIFT code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Account holder name</label>
                <input
                  value={form.accountHolderName}
                  onChange={(e) => setForm((f) => ({ ...f, accountHolderName: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  placeholder="As on bank statement"
                  required
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Currency</label>
                <select
                  value={form.currency}
                  onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-700 text-white focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Country</label>
                <input
                  value={form.country}
                  onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  placeholder="e.g. US, DE, GB"
                />
              </div>
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-fxair-purple text-white font-semibold hover:bg-fxair-purple-light disabled:opacity-50 transition-colors"
            >
              {submitting ? 'Adding...' : 'Add bank account'}
            </button>
          </form>
        )}

        {/* List of banks */}
        <div className="space-y-4">
          {banks.length === 0 ? (
            <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-10 text-center">
              <p className="text-gray-400 mb-2">No bank accounts linked yet.</p>
              <p className="text-sm text-gray-500 mb-4">Add at least one account you’ll send from and one you’ll receive to.</p>
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="px-5 py-2.5 rounded-xl bg-fxair-purple text-white font-semibold hover:bg-fxair-purple-light"
              >
                + Add bank account
              </button>
            </div>
          ) : (
            banks.map((b) => (
              <div
                key={b.id}
                className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex-1">
                  <p className="font-semibold text-white">{b.bankName}</p>
                  <p className="text-sm text-gray-400 mt-0.5">
                    ****{b.accountNumberLast4} · {b.currency} · {b.country}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{b.accountHolderName}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Use as <span className="text-fxair-purple-light">send from</span> or <span className="text-fxair-purple-light">receive to</span> when you transfer (by currency).
                  </p>
                </div>
                <span
                  className={`self-start sm:self-center shrink-0 text-xs px-2.5 py-1 rounded-full ${
                    b.verified ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {b.verified ? 'Verified' : 'Pending verification'}
                </span>
              </div>
            ))
          )}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 text-sm mb-3">Ready to transfer between your linked accounts?</p>
          <Link
            to="/transfer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-fxair-purple text-white font-semibold hover:bg-fxair-purple-light transition-colors"
          >
            New transfer
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        </>
        )}
      </div>
    </main>
  )
}
