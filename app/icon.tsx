import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a4f8c, #0e7c86 55%, #2fa85a)",
          borderRadius: 7,
        }}
      >
        {/* checkmark */}
        <div style={{ display: "flex" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12.5 L9.5 18 L20 6.5"
              stroke="#fff"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    ),
    size
  );
}
