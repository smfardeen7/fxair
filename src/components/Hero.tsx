import Globe from './Globe'

const ANIMATED_CARDS = [
  {
    title: 'Direct bank link',
    description: 'Connect your account once. Your bank approves every transfer.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    ),
  },
  {
    title: 'One approval',
    description: 'You request, your bank approves. No third-party in between.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  },
  {
    title: 'We convert',
    description: 'We handle the currency conversion at a clear, fair rate.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    ),
  },
]

export default function Hero() {
  return (
    <section id="home" className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      <style>{`
        @keyframes card-enter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-card {
          animation: card-enter 0.6s ease-out forwards;
          opacity: 0;
        }
        .hero-card:nth-child(1) { animation-delay: 0.1s; }
        .hero-card:nth-child(2) { animation-delay: 0.25s; }
        .hero-card:nth-child(3) { animation-delay: 0.4s; }
      `}</style>
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-fxair-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fxair-purple-light/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated cards at the start */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-12 lg:mb-16">
          {ANIMATED_CARDS.map((card) => (
            <div
              key={card.title}
              className="hero-card rounded-2xl bg-gray-900/80 border border-gray-800 p-5 lg:p-6 backdrop-blur-sm transition-all duration-300 hover:border-fxair-purple/50 hover:shadow-lg hover:shadow-fxair-purple/10 hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-xl bg-fxair-purple/20 text-fxair-purple-light flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {card.icon}
                </svg>
              </div>
              <h3 className="font-display font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-3xl">
            <p className="text-fxair-purple font-semibold text-sm uppercase tracking-wider mb-4">
              Cross-border transfers, simplified
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Send money across borders{' '}
              <span className="text-fxair-purple-light">directly through your bank.</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mb-8">
              No third parties. You share your bank details, your bank approves the transfer, and we handle the
              currency conversion—so you get more of your money where it needs to go.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#open-account"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-fxair-purple text-white font-semibold hover:bg-fxair-purple-light transition-colors shadow-lg shadow-fxair-purple/25"
              >
                Open Account
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-gray-600 text-gray-200 font-semibold hover:border-fxair-purple-light hover:text-fxair-purple-light transition-colors"
              >
                How it works
              </a>
            </div>
          </div>

          <div className="flex lg:block items-center justify-center lg:pl-4 order-last lg:order-none">
            <div className="w-full max-w-[340px] lg:max-w-[440px] mx-auto lg:mx-0">
              <Globe />
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 grid grid-cols-3 gap-8 max-w-2xl">
          <div className="text-center">
            <p className="font-display text-2xl sm:text-3xl font-bold text-fxair-purple-light">50+</p>
            <p className="text-sm text-gray-400 mt-1">Countries</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl sm:text-3xl font-bold text-fxair-purple-light">24/7</p>
            <p className="text-sm text-gray-400 mt-1">Transfers</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl sm:text-3xl font-bold text-fxair-purple-light">0%</p>
            <p className="text-sm text-gray-400 mt-1">Third-party markup</p>
          </div>
        </div>
      </div>
    </section>
  )
}
