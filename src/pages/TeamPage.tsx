import { Link } from 'react-router-dom'
import Team from '../components/Team'

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="pt-24 pb-16">
        <Team />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-fxair-purple-light font-medium hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
