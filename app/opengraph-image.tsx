import { ImageResponse } from "next/og";

export const alt = "K S Phanindra, full-stack developer: Stride, MediVault and RoadSense";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const projects = [
  { name: "Stride", color: "#c6f432" },
  { name: "MediVault", color: "#2dd4bf" },
  { name: "RoadSense", color: "#f5a524" },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(60% 70% at 25% 0%, rgba(79,124,255,0.35), #07080a 70%)",
          color: "#f5f6f8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#b4bac5" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#34d399" }} />
          Open to SWE internships & full-time roles · 2027 · Bengaluru
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>I’m K S Phanindra.</div>
          <div style={{ fontSize: 40, marginTop: 24, color: "#f5f6f8" }}>I build things that make everyday life easier.</div>
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          {projects.map((p) => (
            <div
              key={p.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 24px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.14)",
                fontSize: 28,
              }}
            >
              <div style={{ width: 14, height: 14, borderRadius: 7, background: p.color }} />
              {p.name}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
