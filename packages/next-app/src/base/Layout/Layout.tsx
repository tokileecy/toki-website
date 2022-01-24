import React from 'react'
import BaseLayout, {
  BaseLayoutProps,
} from '@psycholog-studio/ui/Layouts/BaseLayout'
import { threeManager } from '../core'

export type LayoutProps = Omit<BaseLayoutProps, 'threeManagerRef'>

const Layout = (props: BaseLayoutProps): JSX.Element => {
  return <BaseLayout {...props} threeManager={threeManager} />
}

export default Layout
