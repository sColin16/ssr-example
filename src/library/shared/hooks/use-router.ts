import { useMemo } from "react"
import { ClientPropsService } from "../service/clientProps/types"
import { ClientPropsManager } from "../service/clientPropsManager/types"
import { DefaultRouter } from "../service/clientRouter"
import { ClientRouter } from "../service/clientRouter/types"
import { HistoryManager } from "../service/historyManager/types"

export type UseRouterOptions<SiteProps> = {
  clientPropsService: ClientPropsService<SiteProps>
  useClientPropsManager: () => ClientPropsManager<SiteProps>
  useHistoryManager: () => HistoryManager<SiteProps>
  buildRouter?: (
    clientPropsService: ClientPropsService<SiteProps>,
    clientPropsManager: ClientPropsManager<SiteProps>,
    historyManager: HistoryManager<SiteProps>,
  ) => ClientRouter
}

export type UseRouter = () => ClientRouter

export const buildUseRouter = <SiteProps>({
  clientPropsService,
  useClientPropsManager,
  useHistoryManager,
  buildRouter = (clientPropsService, clientPropsManager, historyManager) =>
    new DefaultRouter(clientPropsService, clientPropsManager, historyManager),
}: UseRouterOptions<SiteProps>) => {
  const useRouter = () => {
    const clientPropsManager = useClientPropsManager()
    const historyManager = useHistoryManager()

    const router = useMemo(
      () => buildRouter(clientPropsService, clientPropsManager, historyManager),
      [buildRouter, clientPropsService, clientPropsManager, historyManager],
    )

    return router
  }

  return useRouter
}
