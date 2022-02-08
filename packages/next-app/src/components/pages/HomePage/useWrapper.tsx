import React, { FC } from 'react'

import { cx } from '@emotion/css'
import * as styles from './useWrapper.styles'

const useWrapper = (Comp: FC<{ show?: boolean }>) => {
  const CompWithWrapper = ({ show }: { show?: boolean }) => {
    return (
      <div className={cx(styles.wrapper, { hide: !show })}>
        <div className={styles.content}>
          <Comp show={show} />
        </div>
      </div>
    )
  }
  return CompWithWrapper
}

export default useWrapper
