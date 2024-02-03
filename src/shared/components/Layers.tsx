import { LayoutPropsProvider } from "shared/contexts/layoutProps"
import { LayoutProps } from "./Layout"
import { LayoutManager } from "./LayoutManager"
import { PagePropsProvider } from "shared/contexts/pageProps"
import { PageManager } from "./PageManager"
import { PageProps } from "./Page"

export const LayoutLayer = ({ children, ...props }: LayoutProps) => {
  return (
    <LayoutPropsProvider initialProps={props}>
      <LayoutManager>{children}</LayoutManager>
    </LayoutPropsProvider>
  )
}

export const PageLayer = (props: PageProps) => {
  return (
    <PagePropsProvider initialProps={props}>
      <PageManager />
    </PagePropsProvider>
  )
}
