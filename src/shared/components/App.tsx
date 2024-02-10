import { LayoutProps } from "./Layout"
import { PageProps } from "./Page"
import { ClientPropsManager } from "shared/service/props-manager"
import { ClientNavigationManager } from "./ClientNavigationManager"
import { ClientPropsManagerContext } from "shared/contexts/propsManager"
import { LayoutManager, PageManager } from "./Managers"

export type SiteProps = {
  layout: LayoutProps
  page: PageProps
}

export type AppProps = {
  clientPropsManager: ClientPropsManager
}

export const App = ({ clientPropsManager }: AppProps) => {
  return (
    <ClientPropsManagerContext.Provider value={clientPropsManager}>
      <ClientNavigationManager />
      <LayoutManager>
        <PageManager />
      </LayoutManager>
    </ClientPropsManagerContext.Provider>
  )
}
