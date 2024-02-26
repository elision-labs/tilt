import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from '@/app/providers'
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"

export const inter = Inter({
  style: "normal",
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
})

export const metadata = {
  title: 'tilt',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
