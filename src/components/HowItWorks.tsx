const steps = [
  {
    step: '1',
    title: 'Add your bank details',
    description: 'Enter the details of the bank account (in any supported country) where your money currently sits.',
  },
  {
    step: '2',
    title: 'Request the transfer',
    description: 'Choose the amount and the destination account. We show you the rate and what will be received.',
  },
  {
    step: '3',
    title: 'Your bank approves',
    description: 'Your bank verifies the request and approves the debit. No third-party processor—just you and your bank.',
  },
  {
    step: '4',
    title: 'We convert and send',
    description: 'We convert the currency and send the funds to the destination. You get confirmation when it’s done.',
  },
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
