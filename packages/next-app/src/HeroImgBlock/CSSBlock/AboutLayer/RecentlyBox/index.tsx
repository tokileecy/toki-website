import { css } from '@emotion/css'
import MessageBox from '../../../../components/Containers/MessageBox'

export default function RecentlyBox(): JSX.Element {
  return (
    <MessageBox
      className={css`
        width: 500px;
        min-height: 100px;
        padding: 20px;
      `}
    >
      <span>
        {
          '我畢業於國立中山大學應用數學系，因個人興趣因緣際會下踏入前端相關領域。最初開發維護過 Vue.js 與 Asp.Net 的內部專案。並也有接觸過部分 Unity C# 的開發。'
        }
        <p />
        {`目前工作上主要使用使用 Storybook、Lerna、Emotion 等前端的工具配合 React 進行開發。`}
        <p />
        {`目前正關注 Design System 相關的技術與知識，並持續觀察 WebAssembly 與 Deno 等技術的發展進行學習中。`}
      </span>
    </MessageBox>
  )
}
