import { LayoutProps } from "./Layout"
import { PageProps } from "./Page"
import { LayoutManager } from "./LayoutManager"
import { PagePropsProvider } from "shared/contexts/pageProps"
import { PageManager } from "./PageManager"
import { LayoutPropsProvider } from "shared/contexts/layoutProps"
import { ClientPropsManager } from "shared/service/props-manager"
import { ClientNavigationManager } from "./ClientNavigationManager"
import { ClientPropsManagerContext } from "shared/contexts/propsManager"

export type SiteProps = {
  layout: LayoutProps
  page: PageProps
}

export type AppProps = {
  siteProps: SiteProps
  clientPropsManager: ClientPropsManager
}

export const App = ({ siteProps, clientPropsManager }: AppProps) => {
  return (
    <ClientPropsManagerContext.Provider value={clientPropsManager}>
      <ClientNavigationManager />
      <LayoutPropsProvider initialProps={siteProps.layout}>
        <PagePropsProvider initialProps={siteProps.page}>
          <LayoutManager>
            <PageManager />
          </LayoutManager>
        </PagePropsProvider>
      </LayoutPropsProvider>
    </ClientPropsManagerContext.Provider>
  )
}
