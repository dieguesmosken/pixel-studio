import { ReactNode } from "react" // ✅ importação correta
import type { Metadata } from "next"
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: '700' });

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"

export const metadata: Metadata = {
  title: "Pixel Studio",
  description: "A powerful pixel art and animation editor",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
