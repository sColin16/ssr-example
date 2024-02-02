import { usePageProps } from "shared/hooks/use-page-props"
import { Page } from "./Page"

export const PageManager = () => {
  // TODO: consider also providing the layout props here. It costs us nothing
  // since if the layout props updated The page has to rerender anyways
  // Actually, that might not be true, React may need to rerender, but it isn't
  // calling the Page component function again
  const [pageProps] = usePageProps()

  return <Page {...pageProps} />
}
