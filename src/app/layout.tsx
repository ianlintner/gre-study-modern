"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./globals.css";

type Theme = "light" | "dark" | "vaporwave";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      const initialTheme = systemPrefersDark ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);
    }
  }, []);

  const cycleTheme = () => {
    const themes: Theme[] = ["light", "dark", "vaporwave"];
    const currentIndex = themes.indexOf(theme);
    const newTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return "🌙 Dark Mode";
      case "dark":
        return "🌴 Vaporwave";
      case "vaporwave":
        return "☀️ Light Mode";
    }
  };

  return (
    <html lang="en">
      <body className="antialiased">
        {/* Vaporwave background elements */}
        {theme === "vaporwave" && (
          <>
            <div className="vaporwave-stars" />
            <div className="vaporwave-sun" />
            <div className="vaporwave-grid" />
          </>
        )}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 2rem",
            borderBottom: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>GRE Study</h1>
            <nav style={{ display: "flex", gap: "1rem" }}>
              <Link
                href="/"
                style={{
                  textDecoration: "none",
                  color: "var(--color-text)",
                  fontWeight: 500,
                }}
              >
                Home
              </Link>
              <Link
                href="/question-bank"
                style={{
                  textDecoration: "none",
                  color: "var(--color-text)",
                  fontWeight: 500,
                }}
              >
                Question Bank
              </Link>
            </nav>
          </div>
          <button type="button" onClick={cycleTheme} aria-label="Toggle theme">
            {getThemeIcon()}
          </button>
        </header>
        <main className="container">{children}</main>
        <footer
          style={{
            textAlign: "center",
            padding: "1rem",
            borderTop: "1px solid var(--color-border)",
            marginTop: "2rem",
            color: "var(--color-text-secondary)",
          }}
        >
          © {new Date().getFullYear()} GRE Study. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
