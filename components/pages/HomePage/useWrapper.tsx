import React, { FC } from 'react'

import { cx } from '@/styles/cssInstance'
import * as styles from './useWrapper.styles'

const useWrapper = <T,>(Comp: FC<T & { show?: boolean }>) => {
  const CompWithWrapper = (props: T & { show?: boolean }) => {
    return (
      <div className={cx(styles.wrapper, { hide: !props.show })}>
        <div className={styles.content}>
          <Comp {...props} />
        </div>
      </div>
    )
  }
  return CompWithWrapper
}

export default useWrapper
