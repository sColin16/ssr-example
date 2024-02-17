import { LayoutProps, ManagedLayout } from "./Layout"
import { ManagedPage, PageProps } from "./Page"
import { ClientPropsManager } from "library/shared/service/clientPropsManager.ts/types"
import { ClientPropsManagerContext } from "../package"
import { ManagedHead } from "./Head"

export type SiteProps = {
  layout: LayoutProps
  page: PageProps
}

export type AppProps = {
  clientPropsManager: ClientPropsManager<SiteProps>
}

export const AppBody = ({ clientPropsManager }: AppProps) => {
  return (
    <ClientPropsManagerContext.Provider value={clientPropsManager}>
      <ManagedLayout>
        <ManagedPage />
      </ManagedLayout>
    </ClientPropsManagerContext.Provider>
  )
}

export const AppHead = ({ clientPropsManager }: AppProps) => {
  return (
    <ClientPropsManagerContext.Provider value={clientPropsManager}>
      <ManagedHead />
    </ClientPropsManagerContext.Provider>
  )
}
