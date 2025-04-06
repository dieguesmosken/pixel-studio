"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {
  const { t } = useLanguage()

  // GitHub repository URL
  const githubRepo = "https://github.com/dieguesmosken/pixel-studio"

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <span className="text-primary">Pixel</span>
            <span>Studio</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium">
              {t("nav.draw","Draw")}
            </Link>
            <Link href="/download" className="text-sm font-medium">
              {t("nav.download", "Download")} 
            </Link>
            <Link href="/about" className="text-sm font-medium">
              {t("nav.about", "About")}
            </Link>
            <Link href={githubRepo} target="_blank" rel="noopener noreferrer" className="text-sm font-medium">
              GitHub
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Link href="/editor">
              <Button>{t("nav.buttonStart", "Start Now")}</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t("home.title")}
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("home.description")}
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/editor">
                  <Button size="lg">
                    <ArrowDown className="h-4 w-4" />
                    {t("nav.buttonStart")}
                    </Button>
                </Link>
                <Link href="/download">
                  <Button size="lg" variant="outline">
                    <ArrowDown className="h-4 w-4" />
                    {t("nav.download")}
                    
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px] rounded-lg border bg-background p-2 shadow-lg">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="h-full w-full rounded bg-zinc-950 flex items-center justify-center">
                  <div className="w-32 h-32 bg-primary animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32 border-t">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">
                {t("sectionMiddle.title1")}
              </h3>
              <p className="text-gray-500">
                {t("sectionMiddle.description1")}
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 2v8" />
                  <path d="m16 6-4 4-4-4" />
                  <rect width="20" height="8" x="2" y="14" rx="2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">
                {t("sectionMiddle.title2")}
              </h3>
              <p className="text-gray-500">
                {t("sectionMiddle.description2")}
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Github className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">
                {t("sectionMiddle.title3")}
              </h3>
              <p className="text-gray-500">
                {t("sectionMiddle.description3")}
              </p>
              <Link
                href={githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                {t("sectionMiddle.sourcecode", "Source code")}
              </Link>
            </div>
          </div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32 border-t">
          <div className="mx-auto flex max-w-5xl flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t("sectionBottom.title")}
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("sectionBottom.description")}
            </p>
            <div className="flex justify-center">
              <Link href="/download">
                <Button size="lg" className="gap-2">
                  {t("sectionBottom.download")}
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} <span className="hidden md:inline"> 
              <a href={githubRepo} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Pixel Studio </a>
               | </span>{t("footer.copyright")}
            
          </p>
          <div className="flex gap-4">
            <Link
              href={githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:underline"
            >
              GitHub
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              {t("footer.terms")}
            </Link>
            <Link href="/about" className="text-sm text-gray-500 hover:underline">
              {t("footer.about")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

