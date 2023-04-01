import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import { colors } from '@/styles/baseStyles'
import Color from 'color'
import Script from 'next/script'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const GTM_ID = publicRuntimeConfig.GTM_ID

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render(): JSX.Element {
    return (
      <Html
        style={{
          backgroundColor: Color(colors.black1000).toString(),
        }}
      >
        <Head>
          {/* <!-- Google Tag Manager --> */}
          <Script strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
          {/* <!-- End Google Tag Manager --> */}
        </Head>
        {/* <script src="/scripts/justfont.js"></script> */}
        <body className="hide">
          <Main />
          <NextScript />
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                height="0"
                width="0"
                style="display:none; visibility: hidden;"
              ></iframe>   
          
            `,
            }}
          ></noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}
        </body>
      </Html>
    )
  }
}

export default MyDocument
