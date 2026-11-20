import { ImageResponse } from "next/og";

export const alt = "K S Phanindra, full-stack developer: Stride, MediVault and RoadSense";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const projects = ["Stride", "MediVault", "RoadSense"];

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
          background: "#e9e7e1",
          color: "#111111",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 24,
            borderBottom: "1px solid #d3d0c8",
            fontSize: 22,
            letterSpacing: 1,
            color: "#444444",
          }}
        >
          <div style={{ display: "flex" }}>FULL-STACK DEVELOPER · BENGALURU · BMSCE &apos;27</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 18px",
              borderRadius: 999,
              border: "1px solid #2f3bff",
              color: "#2f3bff",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#2f3bff" }} />
            OPEN TO SWE ROLES
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 500, letterSpacing: -3, lineHeight: 1 }}>K S Phanindra</div>
          <div style={{ fontSize: 44, marginTop: 24, color: "#111111" }}>I build things that make everyday life easier.</div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {projects.map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid #d3d0c8",
                fontSize: 24,
                letterSpacing: 1,
                color: "#444444",
              }}
            >
              {p.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
