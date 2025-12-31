/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--c-background) / <alpha-value>)",
        foreground: "rgb(var(--c-foreground) / <alpha-value>)",
        card: "rgb(var(--c-card) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        mutedForeground: "rgb(var(--c-muted-foreground) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        accentSecondary: "rgb(var(--c-accent-secondary) / <alpha-value>)",
        accentTertiary: "rgb(var(--c-accent-tertiary) / <alpha-value>)",
        border: "rgb(var(--c-border) / <alpha-value>)",
        input: "rgb(var(--c-input) / <alpha-value>)",
        ring: "rgb(var(--c-ring) / <alpha-value>)",
        destructive: "rgb(var(--c-destructive) / <alpha-value>)"
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        label: ["var(--font-label)"]
      },
      boxShadow: {
        neon: "var(--box-shadow-neon)",
        "neon-sm": "var(--box-shadow-neon-sm)",
        "neon-lg": "var(--box-shadow-neon-lg)",
        "neon-secondary": "var(--box-shadow-neon-secondary)",
        "neon-tertiary": "var(--box-shadow-neon-tertiary)"
      },
      keyframes: {
        blink: { "50%": { opacity: "0" } },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(2px, -2px)" },
          "60%": { transform: "translate(-1px, -1px)" },
          "80%": { transform: "translate(1px, 1px)" }
        },
        rgbShift: {
          "0%, 100%": { textShadow: "-2px 0 #ff00ff, 2px 0 #00d4ff" },
          "50%": { textShadow: "2px 0 #ff00ff, -2px 0 #00d4ff" }
        },
        scanlineSweep: {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(120vh)" }
        },
        typing: {
          from: { width: "0" },
          to: { width: "var(--tw-type-width, 28ch)" }
        }
      },
      animation: {
        blink: "blink 1s step-end infinite",
        glitch: "glitch 2.5s steps(2, end) infinite",
        rgb: "rgbShift 3.5s ease-in-out infinite",
        scanline: "scanlineSweep 5.5s linear infinite",
        typing: "typing 2.8s steps(28, end) 1 both"
      }
    }
  },
  plugins: []
};

