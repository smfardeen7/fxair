export default function Founder() {
  return (
    <section id="founder" className="py-20 lg:py-28 bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-fxair-purple font-semibold text-sm uppercase tracking-wider mb-3">
            Our founder
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            The person behind FX AIR
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
          <div className="shrink-0">
            <img
              src={`${import.meta.env.BASE_URL}founder.png`}
              alt="Founder of FX AIR"
              className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl object-cover border-2 border-gray-800 shadow-xl"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl font-bold text-white mb-1">
              Shaik Mohammad Fardeen
            </h3>
            <p className="text-fxair-purple-light font-medium mb-4">
              Founder & CEO
            </p>
            <p className="text-gray-400 leading-relaxed max-w-xl">
              Building FX AIR to make cross-border transfers simple and fair. We believe your bank should approve, 
              and we handle the conversion—no extra layers, no hidden markups. Conversions that feel effortless.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
