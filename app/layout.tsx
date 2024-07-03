import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ConvexClientProviders } from "@/components/providers/convex-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Noteify App",
  description: "Made by Om Chaudhari",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        url: "/next.svg",
        href: "/next.svg",
      },
      {
        media: "(prefers-color-scheme: light)",
        url: "/vercel.svg",
        href: "/vercel.svg",
      },
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body className={inter.className}>
        <ConvexClientProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ConvexClientProviders>
      </body>
    </html>
  );
}
