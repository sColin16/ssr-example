import { ClientPropsManager } from "../service/clientPropsManager/types"
import { HistoryManager } from "../service/historyManager/types"
import { PropsWithChildren } from "react"

type ClientProviderProps<SiteProps> = PropsWithChildren<{
  clientPropsManager: ClientPropsManager<SiteProps>
  historyManager: HistoryManager<SiteProps>
}>

export function buildClientProvider<SiteProps>(
  ClientPropsManagerProvider: React.Provider<ClientPropsManager<SiteProps> | null>,
  HistoryManagerProvider: React.Provider<HistoryManager<SiteProps> | null>,
) {
  const ClientProvider = ({
    clientPropsManager,
    historyManager,
    children,
  }: ClientProviderProps<SiteProps>) => {
    return (
      <ClientPropsManagerProvider value={clientPropsManager}>
        <HistoryManagerProvider value={historyManager}>
          {children}
        </HistoryManagerProvider>
      </ClientPropsManagerProvider>
    )
  }

  return ClientProvider
}
