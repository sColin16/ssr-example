import { LayoutProps } from "./Layout"
import { PageProps } from "./Page"
import { LayoutLayer, PageLayer } from "./Layers"

export type AppProps = {
  layout: LayoutProps
  page: PageProps
}

export const App = (initialProps: AppProps) => {
  return (
    <LayoutLayer {...initialProps.layout}>
      <PageLayer {...initialProps.page} />
    </LayoutLayer>
  )
}
