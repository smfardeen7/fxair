import { useState } from 'react'

const faqs = [
  {
    q: 'Is my money safe?',
    a: 'Yes. Your bank holds your funds until they approve the transfer. We never hold your money as a third-party intermediary—we only facilitate the conversion and instruction to send to the destination account. We use encryption and follow regulated standards.',
  },
  {
    q: 'How does the bank approval work?',
    a: 'When you request a transfer, we send the payment instruction to your bank. Your bank verifies the amount and may ask you to confirm (e.g. via app or 2FA). Once they approve, we convert the currency and send the funds to the destination.',
  },
  {
    q: 'Why no third party?',
    a: 'Traditional services often route your money through one or more intermediaries, each adding cost and delay. With FXAIR, you give your bank details, your bank approves the debit, and we handle the FX conversion and sending—so you get a clearer rate and one less layer in the middle.',
  },
  {
    q: 'How fast are transfers?',
    a: 'Once your bank approves, we process the conversion and send the funds. Delivery time depends on the destination country and bank—often same day for supported corridors, or 1–3 business days for others.',
  },
  {
    q: 'Which countries and banks are supported?',
    a: 'We support many countries and work with a growing network of banks. When you sign up, you can see which banks and corridors are available for your region.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 lg:py-28 bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-fxair-purple font-semibold text-sm uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="border border-gray-800 rounded-xl overflow-hidden"
            >
              <button
                type="button"
                className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-white hover:bg-gray-800 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <span className="text-gray-400 shrink-0 ml-2">
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-4 pt-0">
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
