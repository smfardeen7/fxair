const benefits = [
  {
    title: 'Instant rate lock',
    description: 'See and lock your rate when you start the transfer so you know exactly what the recipient gets.',
    icon: '⏱',
  },
  {
    title: 'No third-party FX markup',
    description: 'We do the conversion ourselves. No extra layer taking a cut—just our transparent rate.',
    icon: '💱',
  },
  {
    title: 'Bank-level security',
    description: 'Your bank approves each transfer. We use encryption and follow regulated standards.',
    icon: '🔒',
  },
  {
    title: 'One dashboard',
    description: 'Track every transfer from request to approval to delivery in a single place.',
    icon: '📊',
  },
]

export default function Benefits() {
  return (
    <section className="py-20 lg:py-28 bg-fxair-purple-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-fxair-purple-bright font-semibold text-sm uppercase tracking-wider mb-3">
            Our benefit
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Serving you. Investing in a better way to move money.
          </h2>
          <p className="text-purple-200">
            We put the control with you and your bank—and we focus on making conversion simple and fair.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/5 border border-purple-400/20 p-6 hover:bg-white/10 transition-colors"
            >
              <span className="text-3xl mb-4 block">{item.icon}</span>
              <h3 className="font-display font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-purple-200 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
