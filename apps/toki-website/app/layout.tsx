import type { Metadata } from 'next'
import Script from 'next/script'
import SceneCanvas from '@/components/SceneCanvas'
import RouteSync from '@/components/RouteSync'
import AppChrome from '@/components/AppChrome'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Tokileecy',
    template: '%s | Tokileecy',
  },
  description: "Tokileecy's website",
  icons: {
    icon: [{ url: '/favicon.png', sizes: '16x16', type: 'image/png' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GTM_ID = 'GTM-WDW2RJB'

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* justfont — xingothic-tc custom font, load before interactive to prevent FOUT */}
        <Script src="/scripts/justfont.js" strategy="beforeInteractive" />

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <SceneCanvas />
        <RouteSync />
        {/*
          Full-screen UI overlay: AppChrome header at top, footer anchored at
          bottom (position:absolute), main content fills the middle.
          pointer-events:none on the container; individual elements opt back in.
        */}
        <div className="fixed inset-0 z-10 flex flex-col items-stretch overflow-hidden pointer-events-none">
          <AppChrome />
          <main className="flex-1 flex items-center justify-center overflow-hidden pointer-events-none py-5 md:pb-[40px] lg:pb-[50px] xl:pb-[60px]">
            <div className="w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1000px] xl:w-[1100px] h-full flex items-center justify-center pointer-events-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
