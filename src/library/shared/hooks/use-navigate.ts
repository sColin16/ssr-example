import { useCallback } from "react"
import { ClientPropsService } from "library/shared/service/clientProps/types"
import { ClientPropsManager } from "library/shared/service/clientPropsManager/types"
import { HistoryManager } from "../service/historyManager/types"

export type UseNavigateOptions<SiteProps> = {
  clientPropsService: ClientPropsService<SiteProps>
  useHistoryManager: () => HistoryManager<SiteProps>
  useClientPropsManager: () => ClientPropsManager<SiteProps>
}

export type UseNavigate = () => (path: string) => void

export const buildUseNavigate = <SiteProps>({
  clientPropsService,
  useHistoryManager,
  useClientPropsManager,
}: UseNavigateOptions<SiteProps>) => {
  const useNavigate: UseNavigate = () => {
    const clientPropsManager = useClientPropsManager()
    const historyManager = useHistoryManager()

    const navigate = useCallback(
      async (path: string) => {
        const currentProps = clientPropsManager.readCurrentProps()

        const { props: updatedProps, finalPath } =
          await clientPropsService.fetchPropsFollowRedirects(path, currentProps)

        const newProps = clientPropsManager.updateProps(updatedProps)

        historyManager.pushState(finalPath, newProps)
      },
      [clientPropsManager],
    )

    return navigate
  }

  return useNavigate
}
