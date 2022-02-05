import usePageInfos from '../../../hooks/usePageInfos'
import usePage from '../../../hooks/usePage'
import { cx } from '@emotion/css'
import Layout from '../../../base/Layout'
import * as styles from './Contact.styles'
import ContactForm from '../../ContactForm'

const About = (): JSX.Element => {
  const { page } = usePage()
  const pageInfos = usePageInfos()

  const hide = page !== pageInfos.pageInfoByPage['contact'].name

  return (
    <Layout>
      <ContactForm
        className={cx(styles.contactFormBox, { hide })}
        classes={{
          contactFieldset: styles.contactFieldset,
        }}
      />
    </Layout>
  )
}

export default About
