import React from 'react'
import Input from '@psycholog-studio/ui/Input'
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

const StyledDiv = (inProps: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...props } = inProps
  return (
    <div
      {...props}
      className={cx(
        css`
          display: flex;
          flex-direction: row;
          margin: 1em 0;
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
        <StyledDiv>
          <StyledLabel htmlFor="name">Name</StyledLabel>
          <Input id="name" />
        </StyledDiv>
        <StyledDiv>
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <Input id="email" />
        </StyledDiv>
        <StyledDiv>
          <StyledLabel htmlFor="message">Message</StyledLabel>
          <Input id="message" component="textarea" />
        </StyledDiv>
      </fieldset>
    </form>
  )
}

export default ContactForm
