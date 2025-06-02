import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Revy Device Reports',
  description: 'Refurbishing devices with Revy',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
