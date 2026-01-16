export default function IPhoneFrame({ children }) {
  return (
    <div className="relative mx-auto w-[320px] sm:w-[360px]">
      {/* Outer drop shadow */}
      <div
        className="relative rounded-[48px] p-[10px]"
        style={{
          boxShadow:
            "0 28px 60px rgba(0,0,0,.45), 0 10px 18px rgba(0,0,0,.35)",
        }}
      >
        {/* Metal frame */}
        <div 
          className="relative rounded-[44px] p-[10px] bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-200"
          style={{
            boxShadow: `
              inset 0 2px 8px rgba(255,255,255,.4),
              inset 0 -2px 8px rgba(0,0,0,.3),
              inset 0 0 20px rgba(0,0,0,.1),
              0 4px 12px rgba(0,0,0,.3),
              0 2px 4px rgba(0,0,0,.2)
            `,
            backgroundImage: `
              linear-gradient(to bottom, rgba(255,255,255,.1) 0%, transparent 50%, rgba(0,0,0,.1) 100%),
              radial-gradient(circle at 30% 20%, rgba(255,255,255,.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(0,0,0,.1) 0%, transparent 50%)
            `,
            border: 'none',
            outline: 'none',
          }}
        >
          {/* Bevel ring (inner) */}
          <div className="relative rounded-[38px] p-[8px] bg-zinc-950" style={{ border: 'none' }}>
            {/* Screen glass */}
            <div
              className="relative overflow-hidden rounded-[30px] bg-zinc-950"
              style={{
                boxShadow:
                  "inset 0 -18px 40px rgba(0,0,0,.55)",
              }}
            >
              {/* Notch */}
              <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
                <div
                  className="relative h-[26px] w-[140px] rounded-b-[18px] bg-zinc-950"
                  style={{
                    boxShadow:
                      "0 8px 16px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.04)",
                  }}
                >
                  {/* Speaker */}
                  <div className="absolute left-1/2 top-[9px] h-[4px] w-[46px] -translate-x-1/2 rounded-full bg-zinc-800" />
                  {/* Camera */}
                  <div className="absolute right-[18px] top-[8px] h-[6px] w-[6px] rounded-full bg-zinc-700" />
                </div>
              </div>

              {/* Your app/simulation */}
              <div className="relative z-0 h-[640px] w-full bg-white">
                {children}
              </div>
            </div>
          </div>

          {/* Side buttons (optional but adds realism) */}
          <div 
            className="phone-side-button pointer-events-none absolute -left-[3px] top-[140px] h-[54px] w-[6px] rounded-l-full"
            style={{
              boxShadow: `
                inset 0 2px 8px rgba(255,255,255,.4),
                inset 0 -2px 8px rgba(0,0,0,.3),
                inset 0 0 20px rgba(0,0,0,.1),
                inset -1px 0 0 rgba(0,0,0,.25)
              `,
            }}
          />
          <div 
            className="phone-side-button pointer-events-none absolute -left-[3px] top-[210px] h-[34px] w-[6px] rounded-l-full"
            style={{
              boxShadow: `
                inset 0 2px 8px rgba(255,255,255,.4),
                inset 0 -2px 8px rgba(0,0,0,.3),
                inset 0 0 20px rgba(0,0,0,.1),
                inset -1px 0 0 rgba(0,0,0,.25)
              `,
            }}
          />
          <div 
            className="phone-side-button pointer-events-none absolute -right-[3px] top-[170px] h-[70px] w-[6px] rounded-r-full"
            style={{
              boxShadow: `
                inset 0 2px 8px rgba(255,255,255,.4),
                inset 0 -2px 8px rgba(0,0,0,.3),
                inset 0 0 20px rgba(0,0,0,.1),
                inset 1px 0 0 rgba(0,0,0,.25)
              `,
            }}
          />
        </div>
      </div>
    </div>
  );
}
