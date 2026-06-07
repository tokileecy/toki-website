import createEmotion from '@emotion/css/create-instance'

const { css, cx } = createEmotion({
  key: 'custom',
  nonce: 'correctnonce',
})

export { css, cx }
