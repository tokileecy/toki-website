import { css } from '@emotion/css'
import MessageBox from '../../../../components/Containers/MessageBox'

export default function Div1(): JSX.Element {
  return (
    <MessageBox
      className={css`
        width: 250px;
        height: 150px;
      `}
    >
      {" HI !  I'm tokileecy"}
    </MessageBox>
  )
}
