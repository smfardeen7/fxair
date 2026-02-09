import { Link } from 'react-router-dom'

const steps = [
  {
    step: '1',
    title: 'Link your banks',
    description: 'Add the bank account you send from and the one you receive to—in the Direct Bank Link section (see link below).',
    link: true,
  },
  {
    step: '2',
    title: 'Request the transfer',
    description: 'Choose the amount and the destination account. We show you the rate and what will be received.',
    link: false,
  },
  {
    step: '3',
    title: 'Your bank approves',
    description: 'Your bank verifies the request and approves the debit. No third-party processor—just you and your bank.',
    link: false,
  },
  {
    step: '4',
    title: 'We convert and send',
    description: 'We convert the currency and send the funds to the destination. You get confirmation when it’s done.',
    link: false,
  },
]

const transferStatusSteps = [
  { step: '1', title: 'Transferred', description: 'You’ve submitted the transfer request. It’s now in our system.' },
  { step: '2', title: 'Review', description: 'We review your transfer and confirm the details and rate.' },
  { step: '3', title: 'Approved', description: 'Your bank has approved the debit. We’re ready to convert and send.' },
  { step: '4', title: 'Processing', description: 'We’re converting the currency and sending funds to the destination.' },
  { step: '5', title: 'Transferred successfully', description: 'Funds have arrived. You’ll get confirmation and the transaction is complete.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-fxair-purple font-semibold text-sm uppercase tracking-wider mb-3">
            How it works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Four steps to cross-border transfers
          </h2>
          <p className="text-gray-400">
            Your bank holds the money. Your bank approves. We handle the conversion and delivery.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, i) => (
            <div key={item.step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gray-700" />
              )}
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-sm relative z-10">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-fxair-purple text-white font-display font-bold text-lg">
                  {item.step}
                </span>
                <h3 className="font-display font-semibold text-white mt-4 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                {item.link && (
                  <Link
                    to="/direct-bank-link"
                    className="inline-block mt-3 text-sm font-medium text-fxair-purple-light hover:underline"
                  >
                    Go to Direct Bank Link →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 text-fxair-purple-light font-semibold hover:underline"
          >
            See all 4 steps in detail
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Transfer status: 5 steps */}
        <div className="mt-20 lg:mt-28 pt-16 lg:pt-24 border-t border-gray-800">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              Your transfer in 5 steps
            </h3>
            <p className="text-gray-400">
              From the moment you submit until the money arrives—here’s the status at each stage.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {transferStatusSteps.map((item, i) => (
              <div key={item.step} className="relative">
                {i < transferStatusSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+1.5rem)] w-[calc(100%-3rem)] h-0.5 bg-gray-700" aria-hidden />
                )}
                <div className="bg-gray-900/80 rounded-2xl p-5 border border-gray-800 relative z-10 h-full flex flex-col">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-fxair-purple/80 text-white font-display font-bold text-lg shrink-0">
                    {item.step}
                  </span>
                  <h4 className="font-display font-semibold text-white mt-4 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed flex-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
