import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="FX AIR - Conversions that feel effortless" className="h-9 w-auto" />
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Conversions that feel effortless. Direct bank transfers without third-party markup.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/" state={{ scrollTo: 'about' }} className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/team" className="hover:text-white transition-colors">Our team</Link></li>
              <li><Link to="/" state={{ scrollTo: 'features' }} className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
              <li><Link to="/open-account" className="hover:text-white transition-colors">Sign up</Link></li>
              <li><Link to="/" state={{ scrollTo: 'pricing' }} className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" state={{ scrollTo: 'faq' }} className="hover:text-white transition-colors">FAQ</Link></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><Link to="/" state={{ scrollTo: 'login' }} className="hover:text-white transition-colors">Login</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} FXAIR. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
