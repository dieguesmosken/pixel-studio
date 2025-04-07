import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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
        <div className="container py-12 max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-lg text-gray-500 mb-8">Last updated: April 6, 2025</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
            <p>
              At Pixel Studio, we respect your privacy and are committed to protecting your personal data. This Privacy
              Policy explains how we collect, use, and safeguard your information when you use our pixel art editor
              application, whether online or as a desktop application.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <h3 className="text-xl font-medium mt-6 mb-3">Personal Data</h3>
            <p>We collect minimal personal information. When using our application:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>We do not require you to create an account</li>
              <li>
                We do not collect your name, email address, or other contact information unless you voluntarily provide
                it for support purposes
              </li>
              <li>We do not track your location</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">Usage Data</h3>
            <p>We may collect anonymous usage data to improve our application, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Technical information such as browser type, operating system, and device type</li>
              <li>Feature usage patterns (which tools are used most frequently)</li>
              <li>Error reports to help us fix bugs</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide, maintain, and improve our application</li>
              <li>Develop new features based on user behavior</li>
              <li>Fix bugs and address technical issues</li>
              <li>Analyze usage patterns to optimize user experience</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Storage and Security</h2>
            <p>For the online version of Pixel Studio:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Your pixel art creations are stored locally in your browser's storage</li>
              <li>
                We do not store your artwork on our servers unless you explicitly use a sharing or cloud save feature
              </li>
              <li>
                Any data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS
                protocols
              </li>
            </ul>

            <p>For the desktop version of Pixel Studio:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>All your artwork is stored locally on your device</li>
              <li>We do not have access to files you create with our desktop application</li>
              <li>Usage analytics are anonymized and contain no personally identifiable information</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies and Tracking</h2>
            <p>
              Our website uses cookies to enhance your experience and analyze usage patterns. You can control cookie
              settings through your browser preferences. We use the following types of cookies:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Essential cookies: Required for basic functionality</li>
              <li>Preference cookies: Remember your settings and preferences</li>
              <li>Analytics cookies: Help us understand how users interact with our application</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Services</h2>
            <p>
              We may use third-party services for analytics, error reporting, and performance monitoring. These services
              may collect anonymous usage data subject to their own privacy policies. Our current third-party service
              providers include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Google Analytics (for website usage analysis)</li>
              <li>Sentry (for error tracking)</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>The right to access information we have about you</li>
              <li>The right to request deletion of your data</li>
              <li>The right to object to processing of your data</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>To exercise any of these rights, please contact us at privacy@pixelstudio.example.com.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
            <p>
              Our application is suitable for users of all ages. We do not knowingly collect personal information from
              children under 13. If you are a parent or guardian and believe your child has provided us with personal
              information, please contact us so we can take appropriate action.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy
              Policy periodically for any changes.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mb-4">Email: privacy@pixelstudio.example.com</p>
            <p>
              Pixel Studio
              <br />
              123 Creativity Lane
              <br />
              Digital City, DC 10101
            </p>
          </div>
        </div>
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

