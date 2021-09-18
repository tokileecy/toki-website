import { createElement, createRef, FC, RefObject } from 'react'
import ReactDom from 'react-dom'
import { CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

export const ratio = 1
// export const ratio = 1440 / 489.27

export class ReactCSSObjectWrapper<K, T> {
  actionRef: RefObject<T>
  object: CSS3DSprite

  constructor(
    component: Parameters<typeof createElement>[0],
    props?: Parameters<typeof createElement>[1] & {
      actionRef?: RefObject<T>
    } & K
  ) {
    const actionRef = createRef<T>()
    const skillBoxContainer = document.createElement('div')
    ReactDom.render(
      createElement(component, {
        actionRef,
        ...props,
      }),
      skillBoxContainer
    )

    this.actionRef = actionRef
    this.object = new CSS3DSprite(skillBoxContainer)
    this.object.scale.set(ratio, ratio, ratio)
  }
}

export const createCSSObject = <T>(
  component: FC<
    {
      actionRef?: RefObject<T>
    } & Record<string, unknown>
  >,
  actionRef: RefObject<T>
): CSS3DSprite => {
  const skillBoxContainer = document.createElement('div')
  ReactDom.render(
    createElement(component, {
      actionRef,
    }),
    skillBoxContainer
  )

  return new CSS3DSprite(skillBoxContainer)
}
