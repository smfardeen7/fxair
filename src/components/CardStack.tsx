import { useEffect, useRef, useState } from 'react'

const CARD_COUNT = 10
const FAN_START = -22
const FAN_END = 22

export default function CardStack() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [runId, setRunId] = useState(0)
  const wasInView = useRef(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const nowInView = entry.isIntersecting
          if (nowInView && !wasInView.current) setRunId((r) => r + 1)
          wasInView.current = nowInView
          setInView(nowInView)
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -80px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative w-full flex justify-center items-center min-h-[200px] lg:min-h-[260px] py-6"
    >
      <style>{`
        @keyframes card-come-out {
          from {
            transform: translate(-50%, -50%) translate(0, 0) rotate(0deg);
            opacity: 0.5;
          }
          to {
            transform: translate(-50%, -50%) translate(var(--mx), var(--my)) rotate(var(--rot));
            opacity: 1;
          }
        }
        @keyframes stack-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .card-stack-card {
          transform: translate(-50%, -50%) translate(0, 0) rotate(0deg);
          opacity: 0.5;
          transition: none;
        }
        .card-stack-section-in-view .card-stack-card {
          animation: card-come-out 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .card-stack-section-in-view .card-stack-wrapper {
          animation: stack-float 5s ease-in-out infinite;
        }
        .card-stack-wrapper {
          transition: transform 0.3s ease-out;
        }
      `}</style>
      <div
        key={runId}
        className={`card-stack-wrapper relative w-[260px] h-[170px] lg:w-[300px] lg:h-[190px] ${inView ? 'card-stack-section-in-view' : ''}`}
      >
        {Array.from({ length: CARD_COUNT }).map((_, i) => {
          const t = i / Math.max(CARD_COUNT - 1, 1)
          const rotation = FAN_START + t * (FAN_END - FAN_START)
          const mx = (i - (CARD_COUNT - 1) / 2) * 7
          const my = (i - (CARD_COUNT - 1) / 2) * -4
          const isFront = i === CARD_COUNT - 1
          return (
            <div
              key={i}
              className="card-stack-card absolute left-1/2 top-1/2 w-[200px] lg:w-[224px] origin-center"
              style={{
                zIndex: i,
                left: '50%',
                top: '50%',
                '--rot': `${rotation}deg`,
                '--mx': `${mx}px`,
                '--my': `${my}px`,
                animationDelay: inView ? `${i * 0.12}s` : '0s',
              } as React.CSSProperties}
            >
              <div
                className="w-full aspect-[1.586/1] rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(152deg, #2d1b4e 0%, #1a0d2e 45%, #3d2468 100%)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      -50deg,
                      transparent,
                      transparent 6px,
                      rgba(255,255,255,0.04) 6px,
                      rgba(255,255,255,0.04) 8px
                    )`,
                  }}
                />
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
                    `,
                    backgroundSize: '10px 10px',
                  }}
                />
                <div className="relative p-3.5 lg:p-4 h-full flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] lg:text-xs font-semibold tracking-widest text-white/90 uppercase">
                      Credit
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-fxair-purple-light flex items-center justify-center">
                        <span className="font-display font-bold text-[8px] lg:text-[10px] text-white">F</span>
                      </div>
                      <span className="text-[8px] lg:text-[10px] font-semibold tracking-wide">FX AIR</span>
                    </div>
                  </div>
                  <div>
                    {isFront ? (
                      <>
                        <p className="text-[10px] lg:text-xs font-medium text-white/95 tracking-wide mb-0.5">
                          Thomas Alison
                        </p>
                        <p className="text-[8px] lg:text-[10px] text-white/60 tracking-[0.2em] font-mono">
                          2221 - 0057 - 4680 - 2089
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-[10px] text-white/40 tracking-wide">•••••• ••••••</p>
                        <p className="text-[8px] text-white/30 tracking-widest font-mono">•••• - •••• - •••• - ••••</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
