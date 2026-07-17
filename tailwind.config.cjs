/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: defaultTheme.fontFamily.mono,
        mono: defaultTheme.fontFamily.mono,
      },
      colors: {
        accent: "var(--accent)",
        "on-accent": "var(--on-accent)",
        ink: {
          bg: "#e8e2d5",
          fg: "#17150f",
          muted: "#716a58",
          line: "#d2cab5",
        },
        night: {
          bg: "#020202",
          fg: "#e6e2d8",
          muted: "#7d7768",
          line: "#1a1915",
        },
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.ink.fg"),
            "--tw-prose-headings": theme("colors.ink.fg"),
            "--tw-prose-links": theme("colors.ink.fg"),
            "--tw-prose-bullets": theme("colors.ink.muted"),
            "--tw-prose-hr": theme("colors.ink.line"),
            "--tw-prose-quotes": theme("colors.ink.muted"),
            "--tw-prose-quote-borders": theme("colors.ink.line"),
            "--tw-prose-code": theme("colors.ink.fg"),
            "--tw-prose-pre-bg": "#ded7c5",
            "--tw-prose-pre-code": theme("colors.ink.fg"),
            maxWidth: "none",
            fontSize: "0.9375rem",
            lineHeight: "1.75",
            a: {
              textDecorationThickness: "1px",
              textUnderlineOffset: "3px",
              fontWeight: "400",
            },
            "h1, h2, h3, h4": {
              fontWeight: "500",
              letterSpacing: "-0.01em",
            },
            code: {
              fontWeight: "400",
              backgroundColor: "#dcd5c2",
              padding: "0.1em 0.35em",
              borderRadius: "3px",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            pre: {
              border: `1px solid ${theme("colors.ink.line")}`,
              borderRadius: "4px",
            },
          },
        },
        invert: {
          css: {
            "--tw-prose-body": theme("colors.night.fg"),
            "--tw-prose-headings": theme("colors.night.fg"),
            "--tw-prose-links": theme("colors.night.fg"),
            "--tw-prose-bullets": theme("colors.night.muted"),
            "--tw-prose-hr": theme("colors.night.line"),
            "--tw-prose-quotes": theme("colors.night.muted"),
            "--tw-prose-quote-borders": theme("colors.night.line"),
            "--tw-prose-code": theme("colors.night.fg"),
            "--tw-prose-pre-bg": "#0d0c0a",
            "--tw-prose-pre-code": theme("colors.night.fg"),
            code: { backgroundColor: "#141310" },
            pre: { border: `1px solid ${theme("colors.night.line")}` },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
