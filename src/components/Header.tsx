import { useState } from 'react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#home" className="flex items-center gap-2 shrink-0">
            {!logoError ? (
              <img src="/logo.png" alt="FXAIR" className="h-20 w-auto" onError={() => setLogoError(true)} />
            ) : (
              <span className="font-display font-bold text-3xl">
                <span className="text-fxair-orange">FX</span>
                <span className="text-fxair-blue">AIR</span>
              </span>
            )}
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-fxair-gray text-sm font-medium hover:text-fxair-blue transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#login"
              className="text-fxair-gray text-sm font-medium hover:text-fxair-blue transition-colors"
            >
              Login
            </a>
            <a
              href="#open-account"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-fxair-orange text-white text-sm font-semibold hover:bg-fxair-orange-light transition-colors shadow-lg shadow-fxair-orange/25"
            >
              Open Account
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-fxair-gray hover:bg-gray-100"
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
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-fxair-gray font-medium hover:bg-gray-50 rounded-lg"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="#login" className="px-4 py-2 text-fxair-gray font-medium hover:bg-gray-50 rounded-lg">
                Login
              </a>
              <a
                href="#open-account"
                className="mx-4 mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-fxair-orange text-white font-semibold"
              >
                Open Account
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
