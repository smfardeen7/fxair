export default function Hero() {
  return (
    <section id="home" className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-amber-50/50" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-fxair-orange/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fxair-blue/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-fxair-orange font-semibold text-sm uppercase tracking-wider mb-4">
            Cross-border transfers, simplified
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-fxair-gray-dark leading-tight mb-6">
            Send money across borders{' '}
            <span className="text-fxair-blue">directly through your bank.</span>
          </h1>
          <p className="text-lg text-fxair-gray max-w-xl mb-8">
            No third parties. You share your bank details, your bank approves the transfer, and we handle the
            currency conversion—so you get more of your money where it needs to go.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#open-account"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-fxair-orange text-white font-semibold hover:bg-fxair-orange-light transition-colors shadow-lg shadow-fxair-orange/25"
            >
              Open Account
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-fxair-gray-dark/20 text-fxair-gray-dark font-semibold hover:border-fxair-blue hover:text-fxair-blue transition-colors"
            >
              How it works
            </a>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 grid grid-cols-3 gap-8 max-w-2xl">
          <div className="text-center">
            <p className="font-display text-2xl sm:text-3xl font-bold text-fxair-blue">50+</p>
            <p className="text-sm text-fxair-gray mt-1">Countries</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl sm:text-3xl font-bold text-fxair-orange">24/7</p>
            <p className="text-sm text-fxair-gray mt-1">Transfers</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl sm:text-3xl font-bold text-fxair-blue">0%</p>
            <p className="text-sm text-fxair-gray mt-1">Third-party markup</p>
          </div>
        </div>
      </div>
    </section>
  )
}
