import { useRef, useCallback, MutableRefObject } from 'react'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'

export type CSSObjectRefCallback = (obj: CSS3DObject) => void

const useLayerCSSObjectRef = (
  func?: CSSObjectRefCallback
): [MutableRefObject<CSS3DObject | null>, CSSObjectRefCallback] => {
  const ref = useRef<CSS3DObject | null>(null)
  const callback = useCallback((obj) => {
    if (obj) {
      ref.current = obj
      func?.(obj)

      const changeScale = () => {
        const height = document.body.clientHeight

        obj.scale.set(
          (413 * 2.502) / height,
          (413 * 2.502) / height,
          (413 * 2.502) / height
        )
      }

      changeScale()

      window.addEventListener('resize', () => {
        changeScale()
      })
    }
  }, [])

  return [ref, callback]
}

export default useLayerCSSObjectRef
