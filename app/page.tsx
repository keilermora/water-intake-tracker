import Component from "../water-tracker"
import { LanguageProvider } from "../lib/language-context"
import { ThemeProvider } from "../lib/theme-context"

export default function Page() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Component />
      </LanguageProvider>
    </ThemeProvider>
  )
}
