import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-lg text-gray-500 mb-8">Last updated: April 6, 2025</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to Pixel Studio. These Terms of Service ("Terms") govern your use of our pixel art editor
              application (the "Service"), both the online version and desktop applications, operated by Pixel Studio
              ("we," "us," or "our").
            </p>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of
              the Terms, you may not access the Service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of the Service</h2>

            <h3 className="text-xl font-medium mt-6 mb-3">2.1 Eligibility</h3>
            <p>
              The Service is available for users of all ages. However, if you are under the age of 13, you should use
              the Service only with the involvement and consent of a parent or guardian.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">2.2 User Accounts</h3>
            <p>
              The current version of Pixel Studio does not require account creation. If we implement account features in
              the future, you will be responsible for safeguarding your account credentials and for any activities or
              actions under your account.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">2.3 Acceptable Use</h3>
            <p>When using our Service, you agree not to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use the Service in any way that violates any applicable laws or regulations</li>
              <li>
                Attempt to interfere with, compromise the system integrity or security, or decipher any transmissions to
                or from the servers running the Service
              </li>
              <li>Use the Service to distribute malware, viruses, or other malicious code</li>
              <li>
                Attempt to reverse engineer, decompile, or otherwise try to extract the source code of the Service
              </li>
              <li>
                Use automated means, including spiders, robots, crawlers, or data mining tools to download data from the
                Service
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Intellectual Property</h2>

            <h3 className="text-xl font-medium mt-6 mb-3">3.1 Our Intellectual Property</h3>
            <p>
              The Service and its original content, features, and functionality are owned by Pixel Studio and are
              protected by international copyright, trademark, patent, trade secret, and other intellectual property or
              proprietary rights laws.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">3.2 Open Source</h3>
            <p>
              Pixel Studio is an open-source application. The source code is available under the MIT License. You are
              free to use, modify, and distribute the code according to the terms of this license.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">3.3 Your Content</h3>
            <p>
              You retain all rights to any artwork or content you create using Pixel Studio. We claim no ownership
              rights over your creations.
            </p>
            <p>
              By using sharing features (if implemented), you grant us a non-exclusive, royalty-free license to display,
              store, and distribute your shared content solely for the purpose of providing the Service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Third-Party Links and Services</h2>
            <p>
              The Service may contain links to third-party websites or services that are not owned or controlled by
              Pixel Studio.
            </p>
            <p>
              Pixel Studio has no control over, and assumes no responsibility for, the content, privacy policies, or
              practices of any third-party websites or services. We do not warrant the offerings of any of these
              entities/individuals or their websites.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, in no event shall Pixel Studio, its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential
              or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
              intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Your access to or use of or inability to access or use the Service</li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              <li>
                Loss of your artwork or projects due to software bugs, hardware failures, or other technical issues
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Disclaimer</h2>
            <p>
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE"
              basis. The Service is provided without warranties of any kind, whether express or implied, including, but
              not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement,
              or course of performance.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try
              to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material
              change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after those revisions become effective, you agree to be bound
              by the revised terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the United States, without
              regard to its conflict of law provisions.
            </p>
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
              rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
              provisions of these Terms will remain in effect.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Dispute Resolution</h2>
            <p>
              Any disputes arising out of or relating to these Terms or the Service shall first be attempted to be
              resolved through informal negotiation. If the dispute cannot be resolved through negotiation, it shall be
              submitted to mediation in accordance with the rules of the American Arbitration Association.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p className="mb-4">Email: terms@pixelstudio.example.com</p>
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

