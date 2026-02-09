import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Starter',
    description: 'For occasional personal transfers.',
    price: 'Free',
    period: 'No monthly fee',
    features: [
      'Up to 3 transfers per month',
      'Transparent FX rate',
      'Bank approval flow',
      'Email support',
    ],
    cta: 'Get started',
    highlighted: false,
  },
  {
    name: 'Standard',
    description: 'For regular cross-border needs.',
    price: '$9',
    period: 'per month',
    features: [
      'Up to 10 transfers per month',
      'Better FX rate',
      'Priority processing',
      'Chat support',
    ],
    cta: 'Choose Standard',
    highlighted: true,
  },
  {
    name: 'Business',
    description: 'For teams and higher volume.',
    price: '$29',
    period: 'per month',
    features: [
      'Unlimited transfers',
      'Best FX rate',
      'Dedicated support',
      'API access',
    ],
    cta: 'Contact sales',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-fxair-purple font-semibold text-sm uppercase tracking-wider mb-3">
            Pricing
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-400">
            One low fee or subscription. No hidden third-party markups on your conversion.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 border flex flex-col ${
                plan.highlighted
                  ? 'bg-fxair-purple text-white border-fxair-purple shadow-xl shadow-fxair-purple/20 scale-105'
                  : 'bg-gray-900 border-gray-800 text-gray-300'
              }`}
            >
              <h3 className="font-display font-semibold text-lg mb-1">{plan.name}</h3>
              <p className={`text-sm mb-4 ${plan.highlighted ? 'text-purple-100' : 'text-gray-400'}`}>
                {plan.description}
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display text-3xl font-bold">{plan.price}</span>
                <span className={plan.highlighted ? 'text-purple-100' : 'text-gray-400'}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className="text-fxair-purple">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/open-account"
                className={`block text-center py-3 rounded-xl font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-white text-fxair-purple hover:bg-gray-100'
                    : 'bg-fxair-purple text-white hover:bg-fxair-purple-light'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
