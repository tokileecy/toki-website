import { css } from '@emotion/css'
import MessageBox from '../../../../components/Containers/MessageBox'

export default function LeadRoleBox(): JSX.Element {
  return (
    <MessageBox
      className={css`
        width: 250px;
        height: 100px;
      `}
    >
      {'Tokileecy'}
    </MessageBox>
  )
}
