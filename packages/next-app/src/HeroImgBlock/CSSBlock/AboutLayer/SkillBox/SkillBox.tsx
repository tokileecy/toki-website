import React, { useState, useImperativeHandle } from 'react'
import DialogBox from '../../../../components/DialogBox'
import SubSkillBlock from '../../../../components/SubSkillBlock'
import { css } from '@emotion/css'

export type SkillBoxRefContent = {
  animate: () => void
}

const SkillBox = React.forwardRef<SkillBoxRefContent>((props, ref) => {
  const [animated, setAnimated] = useState(false)

  useImperativeHandle(ref, () => ({
    animate: () => {
      setAnimated(true)
    },
  }))

  return (
    <DialogBox
      ref={{
        current: '[Circular]',
      }}
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
})

SkillBox.displayName = 'SkillBox'

export default SkillBox
