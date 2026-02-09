import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { User } from '../types'
import { setAuthToken, clearAuthToken } from '../lib/api'
import { mockAuthLogin, mockAuthSignup, mockGetUser } from '../lib/mockApi'

const USER_STORAGE = 'fxair_user'

interface AuthContextValue {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (payload: { email: string; password: string; username?: string; firstName?: string; lastName?: string }) => Promise<void>
  logout: () => void
  setUser: (u: User | null) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('fxair_token'))
  const [loading, setLoading] = useState(true)

  const setUser = useCallback((u: User | null) => {
    setUserState(u)
    if (u) localStorage.setItem(USER_STORAGE, JSON.stringify(u))
    else localStorage.removeItem(USER_STORAGE)
  }, [])

  useEffect(() => {
    if (!token) {
      setUserState(null)
      setLoading(false)
      return
    }
    const stored = localStorage.getItem(USER_STORAGE)
    if (stored) {
      try {
        setUserState(JSON.parse(stored))
      } catch {
        setUserState(null)
      }
      setLoading(false)
      return
    }
    const apiUrl = import.meta.env.VITE_API_URL
    if (apiUrl) {
      fetch(`${apiUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => {
          setUserState(data.user ?? data)
        })
        .catch(() => {
          clearAuthToken()
          setToken(null)
          setUserState(null)
        })
        .finally(() => setLoading(false))
    } else {
      mockGetUser()
        .then(setUserState)
        .catch(() => {
          clearAuthToken()
          setToken(null)
          setUserState(null)
        })
        .finally(() => setLoading(false))
    }
  }, [token])

  const login = useCallback(async (email: string, password: string) => {
    const apiUrl = import.meta.env.VITE_API_URL
    if (apiUrl) {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || 'Login failed')
      }
      const data = await res.json()
      const t = data.token || data.accessToken
      const u = data.user ?? data
      setAuthToken(t)
      setToken(t)
      setUser(u)
    } else {
      const data = await mockAuthLogin(email, password)
      setAuthToken(data.token)
      setToken(data.token)
      setUser(data.user)
    }
  }, [setUser])

  const signup = useCallback(
    async (payload: {
      email: string
      password: string
      username?: string
      firstName?: string
      lastName?: string
    }) => {
      const apiUrl = import.meta.env.VITE_API_URL
      if (apiUrl) {
        const res = await fetch(`${apiUrl}/api/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          throw new Error(err.message || 'Signup failed')
        }
        const data = await res.json()
        const t = data.token || data.accessToken
        const u = data.user ?? data
        setAuthToken(t)
        setToken(t)
        setUser(u)
      } else {
        const data = await mockAuthSignup(payload)
        setAuthToken(data.token)
        setToken(data.token)
        setUser(data.user)
      }
    },
    [setUser]
  )

  const logout = useCallback(() => {
    clearAuthToken()
    setToken(null)
    setUserState(null)
  }, [])

  const value: AuthContextValue = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
