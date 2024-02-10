import { usePageProps } from "shared/hooks/use-page-props"
import { Page } from "./Page"
import { useLayoutProps } from "shared/hooks/use-layout-props"

export const PageManager = () => {
  // const layoutProps = useLayoutProps()
  const pageProps = usePageProps()

  // const combinedProps = {...layoutProps, ...pageProps}
  const combinedProps = {...pageProps}

  return <Page {...combinedProps} />
}
