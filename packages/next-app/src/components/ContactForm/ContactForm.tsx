import React from 'react'
import Input from '../Input'
import { css, cx } from '@emotion/css'

const cssBaseFontStyle = css`
  line-height: 1em;
  color: white;
  font-weight: bold;
`

const StyledLabel = (inProps: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  const { className, ...props } = inProps
  return (
    <label
      {...props}
      className={cx(
        css`
          ${cssBaseFontStyle};
          width: 7ch;
          text-align: right;
          margin-right: 15px;
        `,
        className
      )}
    />
  )
}

const StyledP = (inProps: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { className, ...props } = inProps
  return (
    <p
      {...props}
      className={cx(
        css`
          display: flex;
          flex-direction: row;
        `,
        className
      )}
    />
  )
}

const StyledLegend = (inProps: React.HTMLAttributes<HTMLLegendElement>) => {
  const { className, ...props } = inProps
  return (
    <legend
      {...props}
      className={cx(
        css`
          ${cssBaseFontStyle};
          font-size: 1.5em;
          padding: 0 10px;
        `,
        className
      )}
    />
  )
}

export type ContactFormClassKey = 'root' | 'contactFieldset'

export type ContactFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  classes?: {
    [key in ContactFormClassKey]?: string
  }
}

const ContactForm = (inProps: ContactFormProps): JSX.Element => {
  const { classes, className, ...props } = inProps

  return (
    <form {...props} className={cx(classes?.root, className)}>
      <fieldset
        className={cx(
          css`
            border: 1px solid white;
            padding: 5px 30px;
          `,
          classes?.contactFieldset
        )}
      >
        <StyledLegend>Contact</StyledLegend>
        <StyledP>
          <StyledLabel htmlFor="name">Name</StyledLabel>
          <Input id="name" />
        </StyledP>
        <StyledP>
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <Input id="email" />
        </StyledP>
        <StyledP>
          <StyledLabel htmlFor="message">Message</StyledLabel>
          <Input id="message" component="textarea" />
        </StyledP>
      </fieldset>
    </form>
  )
}

export default ContactForm
