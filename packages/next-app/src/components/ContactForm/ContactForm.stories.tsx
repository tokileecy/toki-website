import React from 'react'
import { Story, Meta } from '@storybook/react'
import { css } from '@emotion/css'
import ContactForm, { ContactFormProps } from './ContactForm'

export default {
  title: 'next-app/ContactForm',
  component: ContactForm,
  argTypes: {},
} as Meta

const Template: Story<ContactFormProps> = (args) => {
  return (
    <div
      className={css`
        padding: 30px;
        min-height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #101010;
      `}
    >
      <ContactForm {...args} />
    </div>
  )
}

export const NormalContactForm = Template.bind({})

NormalContactForm.args = {}
