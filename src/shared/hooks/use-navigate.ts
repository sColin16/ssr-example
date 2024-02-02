import { propsService } from "shared/service/props"
import { useLayoutProps } from "./use-layout-props"
import { useCallback, useMemo } from "react"
import { usePageProps } from "./use-page-props"
import { isNotNil } from "shared/utils"

export const useNavigate = () => {
  const [layoutProps, setLayoutProps] = useLayoutProps()
  const [pageProps, setPageProps] = usePageProps()

  const currProps = useMemo(
    () => ({
      layout: layoutProps,
      page: pageProps,
    }),
    [layoutProps, pageProps],
  )

  const navigate = useCallback(
    async (path: string) => {
      const udpatedProps = await propsService.fetchProps(path, currProps)

      // Set the props based on the response
      if (isNotNil(udpatedProps.layout)) {
        console.log("Layout props updated")
        setLayoutProps(udpatedProps.layout)
      }

      if (isNotNil(udpatedProps.page)) {
        console.log("Page props updated")
        setPageProps(udpatedProps.page)
      }

      const newProps = { ...currProps, ...udpatedProps }

      history.pushState(newProps, "", path)
    },
    [currProps, setLayoutProps, setPageProps],
  )

  return navigate
}
