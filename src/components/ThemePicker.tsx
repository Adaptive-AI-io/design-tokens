"use client";

import { useState, useEffect } from "react";

const themes = [
  { id: "cold-purple", label: "Cold Purple", swatch: "#9B6DD7" },
  { id: "half-baked", label: "Half Baked", swatch: "#6DB3C7" },
  { id: "apricot-peach", label: "Apricot Peach", swatch: "#D4896A" },
  { id: "evergreen", label: "Evergreen", swatch: "#5A9A6B" },
] as const;

type ThemeId = (typeof themes)[number]["id"];

const STORAGE_KEY = "adaptive-theme";

function getInitialTheme(): ThemeId {
  if (typeof window === "undefined") return "cold-purple";
  return (localStorage.getItem(STORAGE_KEY) as ThemeId) || "cold-purple";
}

/**
 * Floating theme picker for evaluating color themes in development.
 *
 * Renders a small floating panel with 4 color swatches.
 * Sets `data-theme` on <html> and persists the choice in localStorage.
 *
 * Props:
 * - `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
 * - `defaultTheme`: initial theme if nothing is in localStorage
 * - `collapsible`: whether the panel can be collapsed (default: true)
 */
export function ThemePicker({
  position = "top-right",
  defaultTheme,
  collapsible = true,
}: {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  defaultTheme?: ThemeId;
  collapsible?: boolean;
} = {}) {
  const [theme, setTheme] = useState<ThemeId>(defaultTheme || getInitialTheme());
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    const initial = saved || defaultTheme || "cold-purple";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, [defaultTheme]);

  function switchTheme(id: ThemeId) {
    setTheme(id);
    document.documentElement.setAttribute("data-theme", id);
    localStorage.setItem(STORAGE_KEY, id);
  }

  const posStyle: Record<string, string> = {
    "top-right": "top: 20px; right: 20px;",
    "top-left": "top: 20px; left: 20px;",
    "bottom-right": "bottom: 20px; right: 20px;",
    "bottom-left": "bottom: 20px; left: 20px;",
  };

  const togglePos: Record<string, string> = {
    "top-right": "left: -44px; top: 0;",
    "top-left": "right: -44px; top: 0;",
    "bottom-right": "left: -44px; bottom: 0;",
    "bottom-left": "right: -44px; bottom: 0;",
  };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        ...(Object.fromEntries(
          posStyle[position].split(";").filter(Boolean).map((s) => {
            const [k, v] = s.split(":").map((x) => x.trim());
            return [k, v];
          })
        )),
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid var(--border, #e5e5e5)",
        borderRadius: "16px",
        padding: collapsed ? "0" : "16px",
        width: collapsed ? "0" : "auto",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        fontFamily: "var(--font-body, system-ui)",
      }}
    >
      {collapsible && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          title="Toggle theme picker"
          style={{
            position: "absolute",
            ...Object.fromEntries(
              togglePos[position].split(";").filter(Boolean).map((s) => {
                const [k, v] = s.split(":").map((x) => x.trim());
                return [k, v];
              })
            ),
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--border, #e5e5e5)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          🎨
        </button>
      )}

      {!collapsed && (
        <>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: "var(--ink-muted, #666)",
              marginBottom: 10,
            }}
          >
            Theme
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => switchTheme(t.id)}
                title={t.label}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: t.swatch,
                  border: theme === t.id ? "2px solid var(--ink, #333)" : "2px solid transparent",
                  boxShadow: theme === t.id ? "0 0 0 2px var(--paper, #fff)" : "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ThemePicker;
