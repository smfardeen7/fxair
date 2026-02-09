import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!username.trim()) {
      setError('Enter your username or email.')
      return
    }
    if (!password) {
      setError('Enter your password.')
      return
    }
    setLoading(true)
    try {
      await login(username.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black pt-24 pb-20 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-white mb-2">Login</h1>
            <p className="text-gray-400 text-sm">
              Use your username or email and password to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-username" className="block text-sm font-medium text-gray-300 mb-1">
                Username or email
              </label>
              <input
                id="login-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                placeholder="Your username or email"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                placeholder="Your password"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-fxair-purple text-white font-semibold hover:bg-fxair-purple-light transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don’t have an account?{' '}
            <Link to="/open-account" className="text-fxair-purple-light font-medium hover:underline">
              Sign up (Open account)
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
