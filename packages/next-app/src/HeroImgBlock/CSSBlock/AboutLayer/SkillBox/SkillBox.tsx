import React, { useState, useImperativeHandle, RefObject } from 'react'
import DialogBox from '../../../../components/DialogBox'
import SubSkillBlock from '../../../../components/SubSkillBlock'
import { css } from '@emotion/css'

export type SkillBoxRefContent = {
  animate: () => void
  reset: () => void
}

export type SkillBoxActionRef = RefObject<SkillBoxRefContent>

export type SkillBoxProps = {
  actionRef?: SkillBoxActionRef
}

const SkillBox = React.forwardRef<HTMLDivElement, SkillBoxProps>(
  (props: SkillBoxProps, ref) => {
    const { actionRef } = props
    const [animated, setAnimated] = useState(false)

    useImperativeHandle(actionRef, () => ({
      animate: () => {
        setAnimated(true)
      },
      reset: () => {
        setAnimated(false)
      },
    }))

    return (
      <DialogBox
        ref={ref}
        animated={animated}
        title="SKILL"
        className={css`
          width: 400px;
        `}
      >
        <SubSkillBlock
          description="feqjfioqewjfoejfoeqwjfoewjofewjqoifewjpofewjqopfjeqwofjopqewjfopqewjfopeqwjfqeiwopfjopiqewfjopewqjfpowqejfoqewjfeqwjfopeqwjopfewjopfewjqopj"
          skills={['React', 'Material-UI', 'Vue', 'Polymer']}
          title="Framwork"
        />
        <SubSkillBlock
          description="feqjfioqewjfoejfoeqwjfoewjofewjqoifewjpofewjqopfjeqwofjopqewjfopqewjfopeqwjfqeiwopfjopiqewfjopewqjfpowqejfoqewjfeqwjfopeqwjopfewjopfewjqopj"
          skills={['React', 'Material-UI', 'Vue', 'Polymer']}
          title="Framwork"
        />
      </DialogBox>
    )
  }
)

SkillBox.displayName = 'SkillBox'

export default SkillBox
