import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "@/styles/globals.css"
//import { Toaster } from "@/components/ui/toaster"
import  { Toaster } from 'react-hot-toast';

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: {
    default: "Xtopay Dashboard",
    template: "%s | Xtopay"
  },
  description:
    "Manage your payments, transactions, customers, and settings with the Xtopay Dashboard — built for modern Ghanaian businesses.",
  generator: "Xtopay Platform",
  applicationName: "Xtopay Dashboard",
  keywords: [
    "Xtopay",
    "Payments",
    "Ghana Fintech",
    "Dashboard",
    "Transaction Monitoring",
    "Online Payments",
    "Business Tools",
    "Buy Airtime",
    "Mobile Money",
    "Credit Cards"
  ],
  authors: [{ name: "Xtopay Team", url: "https://xtopay.co" }],
  creator: "Xtopay",
  publisher: "Xtottel Technologies",
  metadataBase: new URL("https://app.xtopay.co"),
  openGraph: {
    title: "Xtopay Dashboard",
    description:
      "Access the Xtopay dashboard to manage transactions, monitor revenue, and serve customers with ease.",
    url: "https://app.xtopay.co",
    siteName: "Xtopay",
    images: [
      {
        url: "https://xtopay.co/og-image.jpg", // Update if you have a specific image
        width: 1200,
        height: 630,
        alt: "Xtopay Dashboard"
      }
    ],
    locale: "en_GB",
    type: "website"
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  themeColor: "#047857" // Update to your primary brand color if different
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>{children}</body>
      {/* <Toaster /> */}
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </html>
  )
}
