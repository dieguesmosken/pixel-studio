"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define available languages
export type Language = "en" | "pt-BR" | "es"

// Define the context type
type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

// Define props for the provider component
interface LanguageProviderProps {
  children: ReactNode
}

// Create the provider component
export function LanguageProvider({ children }: LanguageProviderProps) {
  // Initialize with English, but check localStorage on mount
  const [language, setLanguageState] = useState<Language>("en")
  const [translations, setTranslations] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)

  // Load translations for the current language
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true)
      try {
        // Fetch the translation file from the public directory
        const response = await fetch(`/translations/${language}.json`)
        if (!response.ok) {
          throw new Error(`Failed to load translations for ${language}`)
        }
        const data = await response.json()
        setTranslations(data)
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error)
        // Fallback to empty translations object
        setTranslations({})
      }
      setIsLoading(false)
    }

    loadTranslations()
  }, [language])

  // Load saved language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("pixelStudioLanguage") as Language | null
    if (savedLanguage && ["en", "pt-BR", "es"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Update language and save to localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("pixelStudioLanguage", newLanguage)
  }

  // Translation function
  const t = (key: string): string => {
    if (isLoading) return key // Return the key while translations are loading
    return translations[key] || key // Fallback to the key if translation is missing
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

