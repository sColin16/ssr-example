import { LayoutProps } from "./Layout"
import { PageProps } from "./Page"
import { LayoutManager } from "./LayoutManager"
import { PagePropsProvider } from "shared/contexts/pageProps"
import { PageManager } from "./PageManager"
import { LayoutPropsProvider } from "shared/contexts/layoutProps"
import { ClientPropsManager } from "shared/service/props-manager"
import { ClientNavigationManager } from "./ClientNavigationManager"
import { ClientPropsManagerContext } from "shared/contexts/propsManager"

export type LayerProps = {
  layout: LayoutProps
  page: PageProps
}

export type AppProps = {
  layerProps: LayerProps
  clientPropsManager: ClientPropsManager
}

export const App = ({ layerProps, clientPropsManager }: AppProps) => {
  return (
    <ClientPropsManagerContext.Provider value={clientPropsManager}>
      <ClientNavigationManager />
      <LayoutPropsProvider initialProps={layerProps.layout}>
        <LayoutManager>
          <PagePropsProvider initialProps={layerProps.page}>
            <PageManager />
          </PagePropsProvider>
        </LayoutManager>
      </LayoutPropsProvider>
    </ClientPropsManagerContext.Provider>
  )
}
