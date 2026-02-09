import { Link } from 'react-router-dom'

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-fxair-purple font-semibold text-sm uppercase tracking-wider mb-3">About us</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
              The journey of our company
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              We believe cross-border payments should be simple and direct. Our purpose is to remove the complexity:
              you tell us where your money is, we work with your bank so they approve the transfer, and we handle
              the currency conversion—without adding third-party layers or hidden markups.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              You get one request, one approval from your bank, and one conversion. That’s it.
            </p>
            <Link
              to="/open-account"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-fxair-purple text-white font-semibold hover:bg-fxair-purple-light transition-colors"
            >
              Open Account
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-fxair-purple/10 to-fxair-purple-light/10 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-fxair-purple/20 text-fxair-purple mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <p className="font-display font-semibold text-white">Direct bank-to-bank</p>
                <p className="text-sm text-gray-400 mt-1">Your bank approves. We convert. No middlemen.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
