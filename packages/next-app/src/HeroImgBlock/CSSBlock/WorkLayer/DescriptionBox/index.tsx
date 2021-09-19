import { FC } from 'react'
import { css } from '@emotion/css'
import MessageBox from '../../../../components/Containers/MessageBox'
import { cssBaseBox } from '../../styles'

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
        min-height: 100px;
        padding: 20px;
        ${cssBaseBox};
      `}
    >
      {text}
    </MessageBox>
  )
}

export default Description
