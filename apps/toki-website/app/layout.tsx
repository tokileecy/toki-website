import type { Metadata } from 'next'
import SceneCanvas from '@/components/SceneCanvas'
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
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
