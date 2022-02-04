import React from 'react'
import HomeLayer from './HomeLayer'
import AboutLayer from './AboutLayer'
import WorkLayer from './WorkLayer'
import ContactLayer from './ContactLayer'

export type Page = 'home' | 'about' | 'work' | 'contact'

export interface LayersProps {
  page: Page
}

const Layers = (props: LayersProps): JSX.Element => {
  const { page } = props

  return (
    <>
      {/* <HomeLayer hide={page !== 'home'} /> */}
      <AboutLayer hide={page !== 'about'} />
      <WorkLayer hide={page !== 'work'} />
      <ContactLayer hide={page !== 'contact'} />
    </>
  )
}

export default Layers
