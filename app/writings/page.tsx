import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../components/ThemeToggle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writings",
  description: "Thoughts on software engineering, artificial intelligence, robotics, startup culture, and building innovative products. Articles and insights from Devadath.",
  keywords: ["Devadath Writings", "Tech Blog", "AI Articles", "Robotics Blog", "Software Engineering", "Startup Culture", "Tech Insights"],
  openGraph: {
    title: "Writings | Devadath",
    description: "Thoughts on software engineering, artificial intelligence, robotics, and startup culture.",
    url: "https://devadath.dev/writings",
    type: "website",
    images: [
      {
        url: "/avatar.jpg",
        width: 800,
        height: 600,
        alt: "Devadath Writings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writings | Devadath",
    description: "Thoughts on software engineering, artificial intelligence, robotics, and startup culture.",
    images: ["/avatar.jpg"],
  },
};

export default function Writings() {
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
            <Link href="/">
              <h1 className="text-4xl font-bold mb-4 hover:opacity-70 transition-opacity cursor-pointer">
                Devadath
              </h1>
            </Link>

            {/* Navigation */}
            <nav className="flex gap-8 text-xs">
              <Link
                href="/"
                className="text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors"
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
                className="text-foreground hover:opacity-70 transition-opacity font-bold"
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
          <h2 className="text-3xl font-bold mb-8">Writings</h2>

          <p className="text-secondary">
            This page is under construction(Yes seriously, im not thinking what
            to write)
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-sm text-secondary">© Devadath</footer>
      </div>
    </main>
  );
}
