import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { BankAccount } from '../types'
import { api } from '../lib/api'
import { mockGetBanks, mockAddBank } from '../lib/mockApi'

const useApi = import.meta.env.VITE_API_URL

export default function BanksPage() {
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
    loadBanks()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.bankName.trim() || !form.accountNumber.trim() || !form.accountHolderName.trim()) {
      setError('Fill required fields')
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-white">Bank accounts</h1>
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 rounded-xl bg-fxair-purple text-white font-semibold hover:bg-fxair-purple-light"
          >
            {showForm ? 'Cancel' : 'Link bank'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 mb-8 space-y-4">
            <h2 className="font-semibold text-white">Add bank account</h2>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Bank name</label>
              <input
                value={form.bankName}
                onChange={(e) => setForm((f) => ({ ...f, bankName: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-700 text-white"
                placeholder="e.g. Chase"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Account number</label>
              <input
                value={form.accountNumber}
                onChange={(e) => setForm((f) => ({ ...f, accountNumber: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-700 text-white"
                placeholder="Full account number"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Routing number (optional)</label>
              <input
                value={form.routingNumber}
                onChange={(e) => setForm((f) => ({ ...f, routingNumber: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-700 text-white"
                placeholder="US routing / SWIFT"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Account holder name</label>
              <input
                value={form.accountHolderName}
                onChange={(e) => setForm((f) => ({ ...f, accountHolderName: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-700 text-white"
                placeholder="As on statement"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Currency</label>
                <select
                  value={form.currency}
                  onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-700 text-white"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Country</label>
                <input
                  value={form.country}
                  onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-700 text-white"
                  placeholder="US"
                />
              </div>
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-xl bg-fxair-purple text-white font-semibold disabled:opacity-50"
            >
              {submitting ? 'Adding...' : 'Add bank'}
            </button>
          </form>
        )}

        <div className="space-y-3">
          {banks.length === 0 ? (
            <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-8 text-center text-gray-400">
              No bank accounts linked. Add one to start transferring.
            </div>
          ) : (
            banks.map((b) => (
              <div
                key={b.id}
                className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-white">{b.bankName}</p>
                  <p className="text-sm text-gray-400">****{b.accountNumberLast4} · {b.currency}</p>
                  <p className="text-xs text-gray-500">{b.accountHolderName}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    b.verified ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {b.verified ? 'Verified' : 'Pending'}
                </span>
              </div>
            ))
          )}
        </div>

        <p className="mt-6 text-sm text-gray-500">
          <Link to="/transfer" className="text-fxair-purple-light hover:underline">New transfer</Link>
        </p>
      </div>
    </main>
  )
}
