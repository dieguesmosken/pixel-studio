"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PrivacyRedirect() {
  const router = useRouter()

  useEffect(() => {
    const locale = navigator.language || "en-US"
    const lang = locale.startsWith("pt") ? "pt-BR" : "en-US"
    router.replace(`/${lang}/privacy`)
  }, [router])

  return null
}
