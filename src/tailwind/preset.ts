/**
 * @fennecorelabs/design-tokens — Tailwind 4 Preset
 *
 * Maps CSS custom properties to Tailwind utility classes.
 * Usage in tailwind.config.ts:
 *   import { adaptivePreset } from '@fennecorelabs/design-tokens/tailwind/preset'
 *   export default { presets: [adaptivePreset] }
 */

import type { Config } from "tailwindcss";

export const adaptivePreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "var(--brand-50)",
          100: "var(--brand-100)",
          200: "var(--brand-200)",
          300: "var(--brand-300)",
          400: "var(--brand-400)",
          500: "var(--brand-500)",
          600: "var(--brand-600)",
          700: "var(--brand-700)",
          800: "var(--brand-800)",
          900: "var(--brand-900)",
          950: "var(--brand-950)",
        },
        paper: "var(--paper)",
        cloud: "var(--cloud)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        stone: "var(--stone)",
        border: "var(--border)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          subtle: "var(--accent-subtle)",
          muted: "var(--accent-muted)",
        },
        cta: {
          DEFAULT: "var(--cta-bg)",
          hover: "var(--cta-hover)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        organic: "var(--radius-lg)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        "soft-sm": "var(--shadow-sm)",
        "soft-md": "var(--shadow-md)",
        "soft-lg": "var(--shadow-lg)",
        "soft-xl": "var(--shadow-xl)",
        "accent-sm": "var(--shadow-accent-sm)",
        "accent-md": "var(--shadow-accent-md)",
      },
      maxWidth: {
        content: "var(--max-w)",
      },
      spacing: {
        section: "var(--pad-section)",
      },
      transitionTimingFunction: {
        "out-expo": "var(--ease-out)",
        spring: "var(--ease-spring)",
      },
      zIndex: {
        nav: "var(--z-nav)",
        modal: "var(--z-modal)",
        toast: "var(--z-toast)",
        picker: "var(--z-picker)",
      },
    },
  },
};

export default adaptivePreset;
