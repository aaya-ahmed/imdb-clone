"use client";
import { useEffect, useState } from "react";
export default function LightnessModeBtn() {
  const [theme, setTheme] = useState("");

  function applyTheme(theme: "dark" | "light") {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }
  function toggle() {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  }
  useEffect(() => {
    const theme = localStorage.getItem("theme");
  if (theme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(theme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const systemTheme = prefersDark ? "dark" : "light";
      setTheme(systemTheme);
    }
  }, []);
  return (
    <div>
      <button onClick={toggle}>
        <span>{theme?theme === "light" ? "☀️" : "🌙":""}</span>
      </button>
    </div>
  );
}
