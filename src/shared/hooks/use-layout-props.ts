import { useContext } from "react"
import { LayoutPropsContext } from "shared/contexts/layoutProps"
import { requireOrThrow } from "shared/utils"

export const useLayoutProps = () => {
  const props = useContext(LayoutPropsContext)

  return requireOrThrow(props, new Error("Error accessing the layout props context"))
}
