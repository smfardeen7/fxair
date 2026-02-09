import { Link } from 'react-router-dom'

const steps = [
  {
    step: 1,
    title: 'Link your banks',
    description: 'Add the bank account you send from and the one you receive to. Go to the Direct Bank Link section and enter your bank details—account you’ll debit from and account you’ll credit to.',
    detail: 'You need at least two linked accounts (e.g. one in USD, one in EUR) to transfer between them. Each account is verified for your security.',
    cta: { label: 'Go to Direct Bank Link', to: '/direct-bank-link' },
  },
  {
    step: 2,
    title: 'Request the transfer',
    description: 'Choose how much you want to send and in which currency. Select your source account (debited) and destination account (credited).',
    detail: 'We show you the live exchange rate and the exact amount the recipient will get after our fee. You can review the breakdown before confirming.',
    cta: { label: 'Start a transfer', to: '/transfer' },
  },
  {
    step: 3,
    title: 'Your bank approves',
    description: 'Your bank verifies the request and approves the debit. No third-party payment processor—just you and your bank.',
    detail: 'Your bank may ask you to confirm via their app or 2FA. Once they approve, we receive confirmation and proceed with the conversion.',
    cta: null,
  },
  {
    step: 4,
    title: 'We convert and send',
    description: 'We convert the currency at the locked rate and send the funds to your destination account. You get confirmation when it’s done.',
    detail: 'Delivery time depends on the destination country and bank—often same day for supported corridors, or 1–3 business days for others.',
    cta: { label: 'View transactions', to: '/transactions' },
  },
]

const transferStatusSteps = [
  { step: 1, title: 'Transferred', description: 'You’ve submitted the transfer request. It’s now in our system.' },
  { step: 2, title: 'Review', description: 'We review your transfer and confirm the details and rate.' },
  { step: 3, title: 'Approved', description: 'Your bank has approved the debit. We’re ready to convert and send.' },
  { step: 4, title: 'Processing', description: 'We’re converting the currency and sending funds to the destination.' },
  { step: 5, title: 'Transferred successfully', description: 'Funds have arrived. You’ll get confirmation and the transaction is complete.' },
]

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-fxair-purple font-semibold text-sm uppercase tracking-wider mb-3">
            How it works
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Four steps to cross-border transfers
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Your bank holds the money. Your bank approves. We handle the conversion and delivery.
          </p>
        </div>

        <div className="space-y-10">
          {steps.map((item, i) => (
            <div
              key={item.step}
              className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 sm:p-10 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:gap-8">
                <div className="shrink-0">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-fxair-purple text-white font-display font-bold text-xl">
                    {item.step}
                  </span>
                </div>
                <div className="flex-1 min-w-0 mt-4 sm:mt-0">
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                    {item.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    {item.detail}
                  </p>
                  {item.cta && (
                    <Link
                      to={item.cta.to}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-fxair-purple text-white font-semibold text-sm hover:bg-fxair-purple-light transition-colors"
                    >
                      {item.cta.label}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transfer status: 5 steps */}
        <div className="mt-20 pt-16 border-t border-gray-800">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 text-center">
            Your transfer in 5 steps
          </h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-10">
            From the moment you submit until the money arrives—here’s the status at each stage.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {transferStatusSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6"
              >
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-fxair-purple/80 text-white font-display font-bold text-lg">
                  {item.step}
                </span>
                <h3 className="font-display font-semibold text-white mt-4 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <p className="text-gray-400 mb-4">Ready to get started?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/open-account"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-fxair-purple text-white font-semibold hover:bg-fxair-purple-light transition-colors"
            >
              Open account
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-600 text-gray-300 font-medium hover:bg-gray-800 transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
