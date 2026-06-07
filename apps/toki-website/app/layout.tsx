import type { Metadata } from 'next'
import SceneCanvas from '@/components/SceneCanvas'
import RouteSync from '@/components/RouteSync'
import AppChrome from '@/components/AppChrome'
import './globals.css'

export const metadata: Metadata = {
  title: 'Toki Website',
  description: 'Toki personal website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SceneCanvas />
        <RouteSync />
        <AppChrome />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
