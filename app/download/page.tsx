import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Download,
  Monitor,
  Apple,
  LaptopIcon as Linux,
} from "lucide-react";

export default function DownloadPage() {
  // Version information
  const version = "1.0.0";
  const releaseDate = "April 6, 2025";

  // GitHub repository URL
  const githubRepo = "https://github.com/dieguesmosken/pixel-studio";

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-bold">Back to Home</span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-5xl flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Download Pixel Studio
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Free desktop & offline applications for all major platforms.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                Version {version}
              </span>
              <span className="text-sm text-gray-500">
                Released: {releaseDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                View source code on GitHub
              </Link>
            </div>
          </div>
        </section>
        <section className="container pb-12 md:pb-24 lg:pb-32">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Monitor className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Windows</h3>
              <p className="text-center text-sm text-gray-500">
                Compatible with Windows 10 and Windows 11. 64-bit only.
              </p>
              <div className="mt-auto pt-4">
                <Button className="w-full gap-2" asChild>
                  <Link
                    href={`${githubRepo}/releases/download/v${version}/pixel-studio-${version}-win-x64.exe`}
                  >
                    <Download className="h-4 w-4" />
                    Download for Windows
                  </Link>
                </Button>
                <p className="mt-2 text-xs text-gray-500">
                  Version {version} (64-bit)
                </p>
                <div className="mt-2 text-xs text-gray-500 flex justify-center gap-2">
                  <Link
                    href={`${githubRepo}/releases/download/v${version}/pixel-studio-${version}-win-x64.zip`}
                    className="hover:underline"
                  >
                    ZIP
                  </Link>
                  <Link
                    href={`${githubRepo}/releases/download/v${version}/pixel-studio-${version}-win-x64-portable.exe`}
                    className="hover:underline"
                  >
                    Portable
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Apple className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">macOS</h3>
              <p className="text-center text-sm text-gray-500">
                Compatible with macOS 10.15 and later. Universal binary for
                Intel and Apple Silicon.
              </p>
              <div className="mt-auto pt-4">
                <Button className="w-full gap-2" asChild>
                  {/* <Link href={`${githubRepo}/releases/download/v${version}/pixel-studio-${version}-mac-universal.dmg`}>
                    <Download className="h-4 w-4" />
                    Download for macOS
                  </Link> */}
                  <Link href="">
                    <Download className="h-4 w-4" />
                    Not available
                  </Link>
                </Button>
                <p className="mt-2 text-xs text-gray-500">
                  Version {version} (Universal)
                </p>
                <div className="mt-2 text-xs text-gray-500 flex justify-center gap-2">
                  <Link href="" className="hover:underline">
                    Intel
                  </Link>
                  <Link href="" className="hover:underline">
                    Apple Silicon
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Linux className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Linux</h3>
              <p className="text-center text-sm text-gray-500">
                Available as AppImage, deb, and rpm packages for most
                distributions.
              </p>
              <div className="mt-auto pt-4">
                <Button className="w-full gap-2" asChild>
                  <Link href="">
                    <Download className="h-4 w-4" />
                    Not available
                  </Link>
                </Button>
                <p className="mt-2 text-xs text-gray-500">
                  Version {version} (x86_64)
                </p>
                <div className="mt-2 text-xs text-gray-500 flex justify-center gap-2">
                  <Link href="" className="hover:underline">
                    .deb
                  </Link>
                  <Link
                    href={`${githubRepo}/releases/download/v${version}/pixel-studio-${version}-linux-x86_64.rpm`}
                    className="hover:underline"
                  >
                    .rpm
                  </Link>
                  <Link href="" className="hover:underline">
                    .tar.gz
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container pb-12 md:pb-24 lg:pb-32 border-t pt-12">
          <div className="mx-auto flex max-w-5xl flex-col items-center space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              System Requirements
            </h2>
            <div className="w-full max-w-3xl">
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Windows</h3>
                  <ul className="space-y-1 text-sm text-gray-500">
                    <li>Windows 10 or later</li>
                    <li>4GB RAM</li>
                    <li>100MB disk space</li>
                    <li>OpenGL 2.0+ support</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">macOS</h3>
                  <ul className="space-y-1 text-sm text-gray-500">
                    <li>macOS 10.15 or later</li>
                    <li>4GB RAM</li>
                    <li>100MB disk space</li>
                    <li>Intel or Apple Silicon</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Linux</h3>
                  <ul className="space-y-1 text-sm text-gray-500">
                    <li>Ubuntu 20.04 or equivalent</li>
                    <li>4GB RAM</li>
                    <li>100MB disk space</li>
                    <li>OpenGL 2.0+ support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container pb-12 md:pb-24 lg:pb-32 border-t pt-12">
          <div className="mx-auto flex max-w-5xl flex-col items-center space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Open Source
            </h2>
            <p className="max-w-[600px] text-gray-500">
              Pixel Studio is completely open source and free to use. You can
              view the source code, contribute, or report issues on GitHub.
            </p>
            <Button asChild>
              <Link href={githubRepo} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500">
            © 2024 Pixel Studio. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href={githubRepo}
              className="text-sm text-gray-500 hover:underline"
            >
              GitHub
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:underline"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:underline"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
