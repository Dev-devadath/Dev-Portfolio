import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./components/ThemeToggle";
import { EmailCopy } from "./components/EmailCopy";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center md:justify-end px-6 py-12">
      <div className="max-w-4xl w-full md:mr-[15%]">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <Image
                src="/avatar.jpg"
                alt="Devadath"
                width={80}
                height={80}
                className="w-full h-full object-cover avatar-position"
                priority
                quality={100}
              />
            </div>
          </div>

          {/* Header Section */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">Devadath</h1>

            {/* Navigation */}
            <nav className="flex gap-8 text-xs">
              <Link
                href="/"
                className="text-foreground hover:opacity-70 transition-opacity font-bold"
              >
                HOME
              </Link>
              <Link
                href="/projects"
                className="text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors"
              >
                PROJECTS
              </Link>
              <Link
                href="/writings"
                className="text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors"
              >
                WRITINGS
              </Link>
              <Link
                href="/features"
                className="text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors"
              >
                FEATURES
              </Link>
            </nav>
          </div>

          {/* Spacer */}
          <div className="flex-[0.3]"></div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Content Section */}
        <div className="space-y-4 text-lg leading-relaxed max-w-3xl">
          <p>Hey, I&apos;m Devdath..</p>

          <p>
            I spend my time building software, AI, and machines that can think.
          </p>

          <p>
            Always curious about intelligent software systems, robotics and
            startups. So i mainly learn by building n' breaking things.
          </p>

          <p>
            Right now, I’m building AI systems, robots, and small products to
            learn fast and ship often.
          </p>

          <p>
            This is my digital home where I share{" "}
            <Link
              href="/projects"
              className="underline hover:opacity-70 transition-opacity font-bold"
            >
              projects
            </Link>
            ,{" "}
            <Link
              href="/writings"
              className="underline hover:opacity-70 transition-opacity font-bold"
            >
              writings
            </Link>{" "}
            &{" "}
            <Link
              href="/features"
              className="underline hover:opacity-70 transition-opacity font-bold"
            >
              features
            </Link>
            .
          </p>

          <p className="flex items-center gap-4">
            Open to weird ideas and long conversations:{" "}
            <span className="flex gap-3">
              <a
                href="https://x.com/Dev_devadath"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/dev-devadath"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <EmailCopy />
            </span>
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-sm text-secondary">- Dev</footer>
      </div>
    </main>
  );
}
