"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import { useLanguage, type Language } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: "en", name: t("language.en"), flag: "🇺🇸" },
    { code: "pt-BR", name: t("language.pt-BR"), flag: "🇧🇷" },
    { code: "es", name: t("language.es"), flag: "🇪🇸" },
  ]

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          aria-label={t("language.title")}
          title={t("language.title")}
        >
          <Globe className="h-4 w-4" />
          {languages.find((lang) => lang.code === language)?.flag || "🌐"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-zinc-800 border-zinc-700 text-white"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`flex items-center gap-2 cursor-pointer ${
              language === lang.code
                ? "bg-primary/20 text-primary"
                : "hover:bg-zinc-700"
            }`}
            onClick={() => handleLanguageChange(lang.code)}
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
