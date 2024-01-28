import { useContext } from "react"
import { PropsContext } from "shared/contexts/props"
import { requireOrThrow } from "shared/utils"

export const useProps = () => {
  const props = useContext(PropsContext)

  return requireOrThrow(props, new Error("Error accessing the props context"))
}
