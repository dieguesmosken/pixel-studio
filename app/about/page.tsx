import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, Twitter, Globe, Mail } from "lucide-react"

export default function AboutPage() {
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
        <section className="container py-12 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">About Pixel Studio</h1>
            <p className="mt-6 text-lg text-gray-500 md:text-xl">
              A powerful, open-source pixel art and animation editor built for creators of all skill levels.
            </p>
          </div>
        </section>

        <section className="container pb-12 md:pb-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-500 mb-8">
              We believe that pixel art is a unique and expressive medium that should be accessible to everyone. Our
              mission is to create a powerful yet intuitive tool that empowers artists, game developers, and hobbyists
              to bring their creative visions to life, one pixel at a time.
            </p>

            <h2 className="text-3xl font-bold mb-6">The Story</h2>
            <p className="text-lg text-gray-500 mb-4">
              Pixel Studio began as a passion project in early 2023. As pixel art enthusiasts and game developers, we
              found ourselves switching between multiple tools to create animated sprites for our projects. We wanted a
              single application that combined the best features of existing tools while adding new capabilities
              specifically designed for modern pixel art creation.
            </p>
            <p className="text-lg text-gray-500 mb-8">
              After months of development and testing with a community of pixel artists, we released the first version
              of Pixel Studio in April 2024. We're committed to continuous improvement and regularly add new features
              based on user feedback.
            </p>

            <h2 className="text-3xl font-bold mb-6">Open Source Philosophy</h2>
            <p className="text-lg text-gray-500 mb-4">
              Pixel Studio is proudly open source under the MIT License. We believe in the power of community
              collaboration to create better software. By making our code freely available, we hope to:
            </p>
            <ul className="list-disc pl-8 text-lg text-gray-500 mb-8">
              <li>Encourage contributions from developers around the world</li>
              <li>Ensure transparency in how the application works</li>
              <li>Allow for customization and extension by users with specific needs</li>
              <li>Create a sustainable project that can evolve with the community</li>
            </ul>

            <div className="bg-gray-100 dark:bg-zinc-800 p-6 rounded-lg mb-12">
              <h3 className="text-xl font-bold mb-4">Get Involved</h3>
              <p className="text-gray-500 mb-4">
                We welcome contributions from developers of all skill levels. Whether you're fixing a bug, adding a
                feature, or improving documentation, your help makes Pixel Studio better for everyone.
              </p>
              <div className="flex justify-center">
                <Link href="https://github.com/pixel-studio/pixel-studio" target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2">
                    <Github className="h-4 w-4" />
                    Contribute on GitHub
                  </Button>
                </Link>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6">Meet the Team</h2>
            <div className="grid gap-8 md:grid-cols-2 mb-12">
              <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                <div className="w-24 h-24 bg-gray-200 dark:bg-zinc-700 rounded-full mb-4 overflow-hidden">
                  <div className="w-full h-full bg-grid-pattern opacity-30"></div>
                </div>
                <h3 className="text-xl font-bold">Alex Chen</h3>
                <p className="text-gray-500 mb-2">Founder & Lead Developer</p>
                <p className="text-sm text-gray-500 mb-4">
                  Game developer and pixel artist with a passion for creating tools that make digital art more
                  accessible.
                </p>
                <div className="flex gap-2">
                  <Link
                    href="https://github.com/alexchen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://twitter.com/alexchen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                <div className="w-24 h-24 bg-gray-200 dark:bg-zinc-700 rounded-full mb-4 overflow-hidden">
                  <div className="w-full h-full bg-grid-pattern opacity-30"></div>
                </div>
                <h3 className="text-xl font-bold">Maya Rodriguez</h3>
                <p className="text-gray-500 mb-2">UI/UX Designer</p>
                <p className="text-sm text-gray-500 mb-4">
                  Designer with a background in game development and a focus on creating intuitive interfaces for
                  creative tools.
                </p>
                <div className="flex gap-2">
                  <Link
                    href="https://github.com/mayarodriguez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://mayarodriguez.design"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Globe className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6">Community Contributors</h2>
            <p className="text-lg text-gray-500 mb-4">
              Pixel Studio wouldn't be possible without the contributions of our amazing community. We'd like to thank
              everyone who has helped improve the application through code contributions, bug reports, feature
              suggestions, and user testing.
            </p>
            <p className="text-lg text-gray-500 mb-8">Special thanks to our top contributors:</p>
            <div className="grid gap-4 md:grid-cols-3 mb-12">
              {["Jamie Smith", "Raj Patel", "Sofia Kim", "Carlos Mendez", "Lena Park", "Theo Williams"].map((name) => (
                <div key={name} className="flex items-center p-3 rounded-lg border">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-700 rounded-full mr-3 overflow-hidden">
                    <div className="w-full h-full bg-grid-pattern opacity-30"></div>
                  </div>
                  <div>
                    <p className="font-medium">{name}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p className="text-lg text-gray-500 mb-6">
              Have questions, suggestions, or just want to say hello? We'd love to hear from you!
            </p>
            <div className="grid gap-4 md:grid-cols-2 mb-12">
              <Link
                href="mailto:hello@pixelstudio.example.com"
                className="flex items-center p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <Mail className="h-5 w-5 mr-3 text-gray-500" />
                <span>hello@pixelstudio.example.com</span>
              </Link>
              <Link
                href="https://twitter.com/pixelstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <Twitter className="h-5 w-5 mr-3 text-gray-500" />
                <span>@pixelstudio</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500">© 2024 Pixel Studio. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="https://github.com/pixel-studio/pixel-studio" className="text-sm text-gray-500 hover:underline">
              GitHub
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="/about" className="text-sm text-gray-500 hover:underline">
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

