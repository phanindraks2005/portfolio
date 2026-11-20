import { RoadSenseMap } from "./RoadSenseArt";

/**
 * RoadSense has no screenshots, so its stage is drawn from the app's real rules. `step` (0–3) moves it along:
 * the trace streams in, the dip is found, the model confirms it, and the phone warns the driver.
 */
export function RoadSenseStage({ step }: { step: number }) {
  return (
    <div className="rs-stage relative flex items-center" data-step={step}>
      <div className="relative z-0 min-w-0 flex-1 rounded-[6px] border border-line bg-surface p-[1.2%]">
        <svg
          viewBox="0 0 560 350"
          className="block h-auto w-full"
          role="img"
          aria-label="A trip's speed trace: a drop of at least 20% that recovers within 5 seconds is a candidate; the classifier keeps it above 0.70 confidence; two hits within 20 m confirm a bump"
        >
          <rect width="560" height="350" rx="4" fill="#e9e7e1" />
          <text x="28" y="44" fill="#111111" fontFamily="var(--font-schibsted), sans-serif" fontSize="18" fontWeight="500">
            Speed over a trip
          </text>
          <text x="28" y="68" fill="#5f5f5f" fontFamily="var(--font-schibsted), sans-serif" fontSize="13">
            Example trip · one GPS reading a second
          </text>
          <g stroke="#d3d0c8">
            <line x1="28" x2="532" y1="120" y2="120" />
            <line x1="28" x2="532" y1="180" y2="180" />
            <line x1="28" x2="532" y1="240" y2="240" />
          </g>
          <g className="rs-window">
            <rect x="262" y="96" width="92" height="166" rx="8" fill="#111111" opacity="0.06" />
            <text x="308" y="282" fill="#111111" fontFamily="var(--font-jetbrains), monospace" fontSize="11" textAnchor="middle">
              recovers in ≤ 5 s
            </text>
            <path d="M244 131 L 244 216" stroke="#111111" strokeDasharray="3 4" />
            <text x="236" y="180" fill="#111111" fontFamily="var(--font-jetbrains), monospace" fontSize="11" textAnchor="end">
              drop ≥ 20%
            </text>
          </g>
          <polyline
            className="rs-trace"
            pathLength={1}
            fill="none"
            stroke="#111111"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            points="28,132 70,128 110,134 150,126 190,130 230,128 262,131 282,168 298,214 312,218 326,180 354,134 390,130 430,136 470,128 532,132"
          />
          <g className="rs-dots" fill="#111111">
            {[70, 150, 230, 312, 390, 470].map((x, i) => (
              <circle key={x} cx={x} cy={[128, 126, 128, 218, 130, 128][i]} r="3" />
            ))}
          </g>
          <circle className="rs-hit" cx="305" cy="218" r="7" fill="none" stroke="#111111" strokeWidth="2" />
          <g fontFamily="var(--font-jetbrains), monospace" fontSize="11">
            <g className="rs-chip rs-chip-1">
              <rect x="28" y="300" width="160" height="30" rx="15" fill="none" stroke="#d3d0c8" />
              <text x="108" y="320" fill="#444444" textAnchor="middle">
                Candidate event
              </text>
            </g>
            <g className="rs-chip rs-chip-2">
              <rect x="200" y="300" width="160" height="30" rx="15" fill="none" stroke="#d3d0c8" />
              <text x="280" y="320" fill="#444444" textAnchor="middle">
                Random Forest ≥ 0.70
              </text>
            </g>
            <g className="rs-chip rs-chip-3">
              <rect x="372" y="300" width="160" height="30" rx="15" fill="#111111" />
              <text x="452" y="320" fill="#ffffff" textAnchor="middle">
                2 hits in 20 m: bump
              </text>
            </g>
          </g>
        </svg>
      </div>
      <div className="relative z-10 -ml-[7%] w-[26%] shrink-0">
        <div className="rounded-[6px] border border-line bg-surface p-1">
          <div className="rs-phone relative aspect-[390/844] overflow-hidden rounded-[3px] bg-bg">
            <RoadSenseMap />
          </div>
        </div>
      </div>
    </div>
  );
}
