import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import JsonLd from "./components/JsonLd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://devadath.dev"),
  title: {
    default: "Devadath - Personal Portfolio",
    template: "%s | Devadath",
  },
  description: "Developer, AI & Robotics Engineer, and Entrepreneur building innovative AI systems, humanoid robots, and software products.",
  keywords: ["Devadath", "Portfolio", "AI Developer", "Robotics Engineer", "Software Engineer", "Next.js", "React", "Artificial Intelligence", "Machine Learning", "Humanoid Robotics"],
  authors: [{ name: "Devadath S" }],
  creator: "Devadath S",
  openGraph: {
    title: "Devadath - Personal Portfolio",
    description: "Developer, AI & Robotics Engineer, and Entrepreneur building innovative AI systems, humanoid robots, and software products.",
    url: "https://devadath.dev",
    siteName: "Devadath Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/avatar.jpg",
        width: 800,
        height: 600,
        alt: "Devadath S",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devadath - Personal Portfolio",
    description: "Developer, AI & Robotics Engineer, and Entrepreneur building innovative AI systems, humanoid robots, and software products.",
    images: ["/avatar.jpg"],
    creator: "@devadaths__",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <JsonLd />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
