export default function TrustBar() {
  return (
    <section className="py-8 border-y border-gray-100 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-fxair-gray mb-6">
          Trusted by individuals and businesses worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-70">
          {['Banking partners', 'Regulated', 'Secure', 'Fast settlement'].map((label) => (
            <span key={label} className="text-fxair-gray-dark font-medium">
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
