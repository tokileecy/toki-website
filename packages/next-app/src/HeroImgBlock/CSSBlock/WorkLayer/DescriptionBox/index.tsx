import { FC } from 'react'
import { css } from '@emotion/css'
import MessageBox from '../../../../components/Containers/MessageBox'

export type DescriptionProps = {
  text?: string
}

const Description: FC<DescriptionProps> = (
  props: DescriptionProps
): JSX.Element => {
  const { text = '' } = props
  return (
    <MessageBox
      className={css`
        width: 500px;
        min-height: 100px;
        padding: 20px;
      `}
    >
      {text}
    </MessageBox>
  )
}

export default Description
