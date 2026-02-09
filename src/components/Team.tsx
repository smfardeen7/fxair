const team = [
  {
    name: 'Shaik Mohammad Fardeen',
    role: 'Founder & CEO',
    bio: 'Building FX AIR to make cross-border transfers simple and fair.',
    initials: 'SMF',
    image: `${import.meta.env.BASE_URL}founder.png`,
  },
  {
    name: 'Kaushik Ligireddy',
    role: 'Head of Product',
    bio: 'Focused on making every step of the transfer clear and effortless.',
    initials: 'KL',
  },
  {
    name: 'Kishore Reddy',
    role: 'Head of Compliance',
    bio: 'Keeping your money safe and our operations transparent.',
    initials: 'KR',
  },
]

export default function Team() {
  return (
    <section id="team" className="py-20 lg:py-28 bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-fxair-purple font-semibold text-sm uppercase tracking-wider mb-3">
            Our team
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            The people behind FX AIR
          </h2>
          <p className="text-gray-400">
            We’re a small team focused on one thing: making cross-border transfers simple, fair, and direct.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl bg-gray-900/80 border border-gray-800 p-6 text-center hover:border-fxair-purple/40 transition-colors"
            >
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-gray-700"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-fxair-purple/20 text-fxair-purple-light flex items-center justify-center mx-auto font-display font-bold text-xl mb-4">
                  {member.initials}
                </div>
              )}
              <h3 className="font-display font-semibold text-white mb-1">
                {member.name}
              </h3>
              <p className="text-fxair-purple-light text-sm font-medium mb-3">
                {member.role}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
