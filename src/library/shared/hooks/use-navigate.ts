import { useCallback } from "react"
import { ClientPropsService } from "library/shared/service/clientProps/types"
import { ClientPropsManager } from "library/shared/service/clientPropsManager.ts/types"

export type UseNavigateOptions<SiteProps> = {
  clientPropsService: ClientPropsService<SiteProps>
  useClientPropsManager: () => ClientPropsManager<SiteProps>
}

export type UseNavigate = () => (path: string) => void

export const buildUseNavigate = <SiteProps>({
  clientPropsService,
  useClientPropsManager,
}: UseNavigateOptions<SiteProps>) => {
  const useNavigate: UseNavigate = () => {
    const clientPropsManager = useClientPropsManager()

    const navigate = useCallback(
      async (path: string) => {
        const currentProps = clientPropsManager.readCurrentProps()

        const { props: updatedProps, finalPath } =
          await clientPropsService.fetchPropsFollowRedirects(path, currentProps)

        clientPropsManager.updateProps(updatedProps)

        // TODO: add some sort of abstraction layer over this interaction with the history API
        history.pushState(clientPropsManager.readCurrentProps(), "", finalPath)
      },
      [clientPropsManager],
    )

    return navigate
  }

  return useNavigate
}
