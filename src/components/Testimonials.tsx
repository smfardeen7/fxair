const testimonials = [
  {
    quote:
      'Moving money between my US and Indian accounts used to mean multiple steps and hidden fees. With FXAIR it’s one request, my bank approves, and the rate is clear. Huge relief.',
    author: 'Priya M.',
    handle: '@PriyaM',
  },
  {
    quote:
      'Finally a service that doesn’t add another company in the middle. My bank debits, FXAIR converts, and the money lands where I need it. Simple and transparent.',
    author: 'James K.',
    handle: '@JamesK',
  },
  {
    quote:
      'I use it for business payments across Europe and the UK. Locking the rate and having my bank approve each transfer gives me real control and peace of mind.',
    author: 'Elena V.',
    handle: '@ElenaV',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-fxair-orange font-semibold text-sm uppercase tracking-wider mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-fxair-gray-dark mb-4">
            What our customers say about us
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.handle}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col"
            >
              <p className="text-fxair-gray flex-1 leading-relaxed">"{t.quote}"</p>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="font-semibold text-fxair-gray-dark">{t.author}</p>
                <p className="text-sm text-fxair-gray">{t.handle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
