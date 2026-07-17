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
        ink: {
          bg: "#ffffff",
          fg: "#111111",
          muted: "#6b6b6b",
          line: "#e4e4e4",
        },
        night: {
          bg: "#0b0b0b",
          fg: "#e6e6e6",
          muted: "#8a8a8a",
          line: "#232323",
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
            "--tw-prose-pre-bg": "#fafafa",
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
              backgroundColor: "#f4f4f4",
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
            "--tw-prose-pre-bg": "#101010",
            "--tw-prose-pre-code": theme("colors.night.fg"),
            code: { backgroundColor: "#1a1a1a" },
            pre: { border: `1px solid ${theme("colors.night.line")}` },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
