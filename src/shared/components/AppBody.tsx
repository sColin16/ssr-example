import { LayoutProps } from "./Layout"
import { PageProps } from "./Page"
import { ClientPropsManager } from "shared/service/props-manager"
import { ClientPropsManagerContext } from "shared/contexts/propsManager"
import { LayoutManager, PageManager } from "./Managers"
import { ContextDependentHook } from "./ContextDependentHook"
import { useClientNavigation } from "shared/hooks/use-client-navigation"
import { HeadProps } from "./Head"

export type SiteProps = {
  layout: LayoutProps
  page: PageProps
}

export type AppProps = {
  clientPropsManager: ClientPropsManager
}

export const AppBody = ({ clientPropsManager }: AppProps) => {
  return (
    <ClientPropsManagerContext.Provider value={clientPropsManager}>
      <ContextDependentHook useHook={useClientNavigation} />
      <LayoutManager>
        <PageManager />
      </LayoutManager>
    </ClientPropsManagerContext.Provider>
  )
}
