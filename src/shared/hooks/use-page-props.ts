import { useContext } from "react"
import { PagePropsContext } from "shared/contexts/pageProps"
import { requireOrThrow } from "shared/utils"

export const usePageProps = () => {
  const props = useContext(PagePropsContext)

  return requireOrThrow(props, new Error("Error accessing the page props context"))
}
