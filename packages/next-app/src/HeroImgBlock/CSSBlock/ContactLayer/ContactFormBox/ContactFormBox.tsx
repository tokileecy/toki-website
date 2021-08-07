import { css } from '@emotion/css'
import ContactForm from '../../../../components/ContactForm'

export default function ContactFormBox(): JSX.Element {
  return (
    <ContactForm
      classes={{
        contactFieldset: css`
          padding: 20px 50px;
        `,
      }}
    />
  )
}
