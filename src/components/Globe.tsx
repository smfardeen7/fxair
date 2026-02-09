const GLOBE_IMAGE =
  'https://cdn.prod.website-files.com/68e3b83137aaface697615ea/693031a7bd176cfced0feb16_Image.png'

export default function Globe() {
  return (
    <div className="relative w-full flex items-center justify-center min-h-[320px] lg:min-h-[460px]" aria-hidden>
      <style>{`
        @keyframes globe-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .globe-rotate {
          animation: globe-spin 30s linear infinite;
          transform-origin: center center;
        }
      `}</style>
      <div className="relative w-full max-w-[340px] lg:max-w-[440px] aspect-square rounded-full overflow-hidden bg-black globe-rotate">
        <img
          src={GLOBE_IMAGE}
          srcSet="https://cdn.prod.website-files.com/68e3b83137aaface697615ea/693031a7bd176cfced0feb16_Image-p-500.png 500w, https://cdn.prod.website-files.com/68e3b83137aaface697615ea/693031a7bd176cfced0feb16_Image.png 632w"
          sizes="(max-width: 632px) 100vw, 632px"
          alt="Globe"
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  )
}
