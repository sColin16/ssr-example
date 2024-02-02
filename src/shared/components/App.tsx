import { LayoutProps } from "./Layout"
import { PageProps } from "./Page"
import { LayoutPropsProvider } from "shared/contexts/layoutProps"
import { LayoutManager } from "./LayoutManager"
import { PagePropsProvider } from "shared/contexts/pageProps"
import { PageManager } from "./PageManager"

export type AppProps = {
  layout: LayoutProps
  page: PageProps
}

export const App = (initialProps: AppProps) => {
  return (
    <LayoutPropsProvider initialProps={initialProps.layout}>
      <LayoutManager>
        {/* Page provider nested with layout manager so changes to page props doesn't rerender layout */}
        <PagePropsProvider initialProps={initialProps.page}>
          <PageManager />
        </PagePropsProvider>
      </LayoutManager>
    </LayoutPropsProvider>
  )
}
