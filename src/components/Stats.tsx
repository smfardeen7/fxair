const stats = [
  { value: 98, suffix: '%', label: 'Customer satisfaction' },
  { value: 50, suffix: '+', label: 'Supported countries' },
  { value: 24, suffix: '/7', label: 'Transfer availability' },
]

export default function Stats() {
  return (
    <section className="py-16 lg:py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-10 text-center">
          {stats.map((item) => (
            <div key={item.label}>
              <p className="font-display text-4xl sm:text-5xl font-bold text-white">
                {item.value}
                <span className="text-fxair-purple-bright">{item.suffix}</span>
              </p>
              <p className="text-purple-200 mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
