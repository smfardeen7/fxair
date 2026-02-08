const features = [
  {
    title: 'Direct bank connection',
    description:
      'Link your bank account once. When you request a transfer, we send the request to your bank—they approve, and we handle the rest. No third-party payment processors in between.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    ),
  },
  {
    title: 'Bank-approved transfers',
    description:
      'Your bank verifies the amount and approves the debit. You stay in control with the same security and visibility you expect from your bank.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    ),
  },
  {
    title: 'Our conversion, your rate',
    description:
      'We convert the currency ourselves at transparent rates. No extra third-party FX markup—just one clear rate so you know exactly what arrives in the destination account.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
      />
    ),
  },
  {
    title: 'One request, one approval',
    description:
      'You enter the amount and the destination. Your bank approves. We convert and send. Track every step in one place until the money lands.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-fxair-orange font-semibold text-sm uppercase tracking-wider mb-3">
            Core features
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-fxair-gray-dark mb-4">
            Built for direct, bank-backed transfers
          </h2>
          <p className="text-fxair-gray">
            One flow: your details, your bank’s approval, our conversion. No third parties.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-fxair-blue/20 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-fxair-blue/10 text-fxair-blue flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="font-display font-semibold text-fxair-gray-dark mb-2">{feature.title}</h3>
              <p className="text-sm text-fxair-gray leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
