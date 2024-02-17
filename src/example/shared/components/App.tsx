import { LayoutProps, ManagedLayout } from "./Layout"
import { ManagedPage, PageProps } from "./Page"
import { ClientPropsManager } from "library/shared/service/clientPropsManager/types"
import { ManagedHead } from "./Head"
import { ClientProvider } from "../package"
import { HistoryManager } from "library/shared/service/historyManager/types"

export type SiteProps = {
  layout: LayoutProps
  page: PageProps
}

export type AppProps = {
  clientPropsManager: ClientPropsManager<SiteProps>
  historyManager: HistoryManager<SiteProps>
}

export const AppBody = ({ clientPropsManager, historyManager }: AppProps) => {
  return (
    <ClientProvider
      clientPropsManager={clientPropsManager}
      historyManager={historyManager}
    >
      <ManagedLayout>
        <ManagedPage />
      </ManagedLayout>
    </ClientProvider>
  )
}

export const AppHead = ({ clientPropsManager, historyManager }: AppProps) => {
  return (
    <ClientProvider
      clientPropsManager={clientPropsManager}
      historyManager={historyManager}
    >
      <ManagedHead />
    </ClientProvider>
  )
}
