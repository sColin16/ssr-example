import { useEffect } from "react"

export const useEventListener = <K extends keyof WindowEventMap>(
  type: K,
  listener: (e: WindowEventMap[K]) => void,
) => {
  useEffect(() => {
    addEventListener(type, listener)

    return () => removeEventListener(type, listener)
  })
}
