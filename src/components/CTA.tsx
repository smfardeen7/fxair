export default function CTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-fxair-gray-dark mb-6">
          Ready to transfer?{' '}
          <span className="text-fxair-blue">Join us now.</span>
        </h2>
        <p className="text-lg text-fxair-gray mb-8 max-w-xl mx-auto">
          Add your bank details, request a transfer, and let your bank approve. We’ll handle the rest.
        </p>
        <a
          href="#open-account"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-fxair-orange text-white font-semibold text-lg hover:bg-fxair-orange-light transition-colors shadow-lg shadow-fxair-orange/25"
        >
          Open Account
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
