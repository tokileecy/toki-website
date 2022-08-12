import { css } from '@/styles/cssInstance'
import { fontSizes } from '@/styles/baseStyles'
export const root = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 5px;
  width: 100%;
  font-size: ${fontSizes.body + 1}px;
  margin-top: 0.5em;

  &:first-child {
    margin-top: 0;
  }

  > em {
    line-height: 1.6rem;
  }

  &::after {
    content: '';
    width: 100%;
    height: 20px;
    margin: 0;
  }
`
