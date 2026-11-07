/**
 * RoadSense has no screenshots, so these are drawings made from the app's real behaviour:
 * the map with bump markers and the "Speed Bump Ahead" banner.
 */

export function RoadSenseMap() {
  return (
    <svg
      viewBox="0 0 390 844"
      className="absolute inset-0 size-full"
      role="img"
      aria-label="Illustration of the RoadSense map: a route with speed-bump markers and a Speed Bump Ahead banner at 400 m"
    >
      <rect width="390" height="844" fill="#0e1014" />
      {/* city blocks */}
      <g fill="#14171c">
        <rect x="-10" y="150" width="150" height="120" rx="10" />
        <rect x="190" y="130" width="220" height="150" rx="10" />
        <rect x="-10" y="330" width="120" height="190" rx="10" />
        <rect x="250" y="340" width="160" height="170" rx="10" />
        <rect x="-10" y="590" width="170" height="140" rx="10" />
        <rect x="230" y="580" width="180" height="170" rx="10" />
      </g>
      {/* streets */}
      <g fill="none" stroke="#22262e" strokeLinecap="round">
        <path d="M-20 300 C 120 300, 200 310, 420 300" strokeWidth="18" />
        <path d="M-20 555 C 140 560, 250 548, 420 560" strokeWidth="14" />
        <path d="M165 -20 C 170 200, 170 400, 175 870" strokeWidth="12" />
        <path d="M-20 120 L 420 100" strokeWidth="8" />
        <path d="M220 300 C 230 420, 215 480, 225 560" strokeWidth="8" />
      </g>
      {/* route */}
      <path
        d="M195 860 C 192 700, 176 640, 172 560 C 168 470, 176 400, 175 300 C 175 230, 172 160, 168 60"
        fill="none"
        stroke="#f5a524"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* bumps */}
      {[
        [173, 470],
        [175, 330],
        [170, 190],
      ].map(([x, y]) => (
        <g key={y} className="rs-bump">
          <circle cx={x} cy={y} r="13" fill="#0e1014" stroke="#f5a524" strokeWidth="3" />
          <circle cx={x} cy={y} r="5" fill="#f5a524" />
        </g>
      ))}
      {/* you are here */}
      <circle cx="186" cy="680" r="22" fill="#4f7cff" opacity="0.2" />
      <circle cx="186" cy="680" r="10" fill="#4f7cff" stroke="#fff" strokeWidth="3" />
      {/* banner */}
      <g className="rs-banner">
        <rect x="16" y="44" width="358" height="76" rx="16" fill="#f5a524" />
        <text x="36" y="78" fill="#1a1205" fontFamily="var(--font-inter), sans-serif" fontSize="22" fontWeight="700">
          Speed Bump Ahead
        </text>
        <text x="36" y="104" fill="#1a1205" fontFamily="var(--font-inter), sans-serif" fontSize="16" opacity="0.8">
          in 400 m · slow down
        </text>
      </g>
      {/* speed card */}
      <rect x="16" y="740" width="170" height="80" rx="16" fill="#171a20" />
      <text x="34" y="770" fill="#8a919e" fontFamily="var(--font-inter), sans-serif" fontSize="14">
        Speed
      </text>
      <text x="34" y="803" fill="#f5f6f8" fontFamily="var(--font-geist), sans-serif" fontSize="28" fontWeight="600">
        34 km/h
      </text>
      <rect x="204" y="740" width="170" height="80" rx="16" fill="#171a20" />
      <text x="222" y="770" fill="#8a919e" fontFamily="var(--font-inter), sans-serif" fontSize="14">
        Tracking
      </text>
      <circle cx="229" cy="796" r="5" fill="#34d399" />
      <text x="242" y="803" fill="#f5f6f8" fontFamily="var(--font-inter), sans-serif" fontSize="18" fontWeight="600">
        On
      </text>
    </svg>
  );
}
