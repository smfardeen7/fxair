/**
 * API client for FXAir backend.
 * Set VITE_API_URL in .env for real backend; otherwise mock data is used.
 */

const BASE_URL = import.meta.env.VITE_API_URL || ''

function getToken(): string | null {
  return localStorage.getItem('fxair_token')
}

function getHeaders(includeAuth = true): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (includeAuth && token) headers['Authorization'] = `Bearer ${token}`
  return headers
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 401) {
    localStorage.removeItem('fxair_token')
    localStorage.removeItem('fxair_user')
    window.location.hash = '#/login'
    throw new Error('Unauthorized')
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || res.statusText || 'Request failed')
  }
  return res.json().catch(() => ({} as T))
}

export const api = {
  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, { headers: getHeaders() })
    return handleResponse<T>(res)
  },
  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    })
    return handleResponse<T>(res)
  },
  async postFormData<T>(path: string, formData: FormData): Promise<T> {
    const token = getToken()
    const headers: HeadersInit = {}
    if (token) headers['Authorization'] = `Bearer ${token}`
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers,
      body: formData,
    })
    return handleResponse<T>(res)
  },
}

export function setAuthToken(token: string) {
  localStorage.setItem('fxair_token', token)
}

export function clearAuthToken() {
  localStorage.removeItem('fxair_token')
  localStorage.removeItem('fxair_user')
}
