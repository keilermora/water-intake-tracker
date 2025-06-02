"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type ThemeMode = "light" | "dark" | "system"
export type ThemeStyle = "default" | "ocean" | "forest" | "sunset" | "midnight" | "aurora"

interface ThemeContextType {
  mode: ThemeMode
  style: ThemeStyle
  setMode: (mode: ThemeMode) => void
  setStyle: (style: ThemeStyle) => void
  isDark: boolean
  unlockedThemes: ThemeStyle[]
  unlockTheme: (theme: ThemeStyle) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("system")
  const [style, setStyleState] = useState<ThemeStyle>("default")
  const [isDark, setIsDark] = useState(false)
  const [unlockedThemes, setUnlockedThemes] = useState<ThemeStyle[]>(["default", "ocean"])

  // Load saved preferences
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode") as ThemeMode
    const savedStyle = localStorage.getItem("themeStyle") as ThemeStyle
    const savedUnlocked = JSON.parse(localStorage.getItem("unlockedThemes") || '["default", "ocean"]')

    if (savedMode) setModeState(savedMode)
    if (savedStyle && savedUnlocked.includes(savedStyle)) setStyleState(savedStyle)
    setUnlockedThemes(savedUnlocked)
  }, [])

  // Handle system theme detection and dark mode logic
  useEffect(() => {
    const updateTheme = () => {
      let shouldBeDark = false

      if (mode === "dark") {
        shouldBeDark = true
      } else if (mode === "light") {
        shouldBeDark = false
      } else {
        // system mode
        shouldBeDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      }

      setIsDark(shouldBeDark)

      // Apply theme to document
      const root = document.documentElement
      root.classList.toggle("dark", shouldBeDark)

      // Apply theme style
      root.setAttribute("data-theme", style)
    }

    updateTheme()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (mode === "system") {
        updateTheme()
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [mode, style])

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode)
    localStorage.setItem("themeMode", newMode)
  }

  const setStyle = (newStyle: ThemeStyle) => {
    if (unlockedThemes.includes(newStyle)) {
      setStyleState(newStyle)
      localStorage.setItem("themeStyle", newStyle)
    }
  }

  const unlockTheme = (theme: ThemeStyle) => {
    if (!unlockedThemes.includes(theme)) {
      const newUnlocked = [...unlockedThemes, theme]
      setUnlockedThemes(newUnlocked)
      localStorage.setItem("unlockedThemes", JSON.stringify(newUnlocked))
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        mode,
        style,
        setMode,
        setStyle,
        isDark,
        unlockedThemes,
        unlockTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
