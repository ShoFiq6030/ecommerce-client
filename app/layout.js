import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/src/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-Shop - Premium Online Store",
  description: "Your one-stop shop for premium products at competitive prices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
