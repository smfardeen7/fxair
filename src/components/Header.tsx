import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/', state: { scrollTo: 'about' } },
  { label: 'Our team', to: '/team' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'Features', to: '/', state: { scrollTo: 'features' } },
  { label: 'Pricing', to: '/', state: { scrollTo: 'pricing' } },
  { label: 'FAQ', to: '/', state: { scrollTo: 'faq' } },
]

export default function Header() {
  const navigate = useNavigate()
  const { token, user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const isLoggedIn = !!token

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            {!logoError ? (
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="FX AIR - Conversions that feel effortless" className="h-20 sm:h-21 w-auto" onError={() => setLogoError(true)} />
            ) : (
              <span className="font-display font-bold text-xl sm:text-2xl">
                <span className="text-white">FX</span>
                <span className="text-fxair-purple-light"> AIR</span>
              </span>
            )}
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
{navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  state={link.state}
                  className="text-gray-300 text-sm font-medium hover:text-fxair-purple-light transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            {isLoggedIn && (
              <>
                <Link to="/dashboard" className="text-gray-300 text-sm font-medium hover:text-fxair-purple-light transition-colors">
                  Dashboard
                </Link>
                <Link to="/transfer" className="text-gray-300 text-sm font-medium hover:text-fxair-purple-light transition-colors">
                  Transfer
                </Link>
                <Link to="/direct-bank-link" className="text-gray-300 text-sm font-medium hover:text-fxair-purple-light transition-colors">
                  Direct Bank Link
                </Link>
              </>
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <span className="text-gray-400 text-sm truncate max-w-[120px]" title={user?.email}>
                  {user?.username || user?.email}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-gray-300 text-sm font-medium hover:text-fxair-purple-light transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                state={{ scrollTo: 'login' }}
                  className="text-gray-300 text-sm font-medium hover:text-fxair-purple-light transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/open-account"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-fxair-purple text-white text-sm font-semibold hover:bg-fxair-purple-light transition-colors shadow-lg shadow-fxair-purple/25"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="lg:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  state={link.state}
                  className="px-4 py-2 text-gray-300 font-medium hover:bg-gray-800 rounded-lg"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="px-4 py-2 text-gray-300 font-medium hover:bg-gray-800 rounded-lg" onClick={() => setOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/transfer" className="px-4 py-2 text-gray-300 font-medium hover:bg-gray-800 rounded-lg" onClick={() => setOpen(false)}>
                    Transfer
                  </Link>
                  <Link to="/direct-bank-link" className="px-4 py-2 text-gray-300 font-medium hover:bg-gray-800 rounded-lg" onClick={() => setOpen(false)}>
                    Direct Bank Link
                  </Link>
                  <button
                    type="button"
                    onClick={() => { setOpen(false); handleLogout(); }}
                    className="px-4 py-2 text-left text-gray-300 font-medium hover:bg-gray-800 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/"
                state={{ scrollTo: 'login' }} className="px-4 py-2 text-gray-300 font-medium hover:bg-gray-800 rounded-lg" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                  <Link
                    to="/open-account"
                    className="mx-4 mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-fxair-purple text-white font-semibold"
                    onClick={() => setOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
