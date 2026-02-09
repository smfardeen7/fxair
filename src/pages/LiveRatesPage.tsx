import { Link } from 'react-router-dom'
import LiveConversion from '../components/LiveConversion'

export default function LiveRatesPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="relative pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-fxair-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fxair-purple-light/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              Live rates & conversion
            </h1>
            <p className="text-gray-400 text-lg">
              See how much you get after conversion. We convert at a clear, fair rate.
            </p>
          </div>
          <div className="max-w-md mx-auto rounded-2xl bg-gray-900/80 border border-gray-800 p-6 lg:p-8">
            <LiveConversion />
          </div>
          <div className="text-center mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-fxair-purple-light font-medium hover:underline"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
