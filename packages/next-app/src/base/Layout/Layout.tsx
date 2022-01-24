import React from 'react'
import BaseLayout, {
  BaseLayoutProps,
} from '@psycholog-studio/ui/Layouts/BaseLayout'
import { threeManager } from '../core'
import * as styles from './Layout.styles'

export type LayoutProps = Omit<BaseLayoutProps, 'threeManagerRef'>

const Layout = (props: BaseLayoutProps): JSX.Element => {
  return (
    <BaseLayout
      {...props}
      threeManager={threeManager}
      classes={{
        webglLayer: styles.webglLayer,
      }}
    />
  )
}

export default Layout
