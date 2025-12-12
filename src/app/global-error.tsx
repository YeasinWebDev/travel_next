// /app/global-error.tsx - MUST be in /app (root)
"use client";

import Link from "next/link";
import { Button } from "./components/ui/button";

// IMPORTANT: NO IMPORTS that use useContext or any React hooks!

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  // Completely standalone - no layout, no providers
  return (
    <html>
      <body>
        <div
          style={{
            padding: "40px",
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "#dc2626", marginBottom: "16px" }}>Something went wrong!</h1>
          <p style={{ marginBottom: "20px" }}>{error?.message || "An unexpected error occurred"}</p>
          <button
            onClick={reset}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <br />
          <Button>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </body>
    </html>
  );
}
