"use client"
import { ReactNode, useLayoutEffect } from "react";
type props={ children: ReactNode}
export default function ThemeProvider({ children }: props) {
  function applyTheme(theme: "dark" | "light") {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }
  useLayoutEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      applyTheme(theme as "light" | "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const systemTheme = prefersDark ? "dark" : "light";
      applyTheme(systemTheme);
    }
  });
  return <>{ children }</>;
}
