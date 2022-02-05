import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import { colors } from '../src/baseStyles'
import Color from 'color'
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
        <Head />
        <script src="/scripts/justfont.js"></script>
        <body className="hide">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
