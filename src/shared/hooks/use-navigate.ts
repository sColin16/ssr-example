import { useCallback } from "react"
import { useClientPropsManager } from "./use-client-props-manager"
import { exampleClientPropsService } from "shared/service/clientProps/example"

export const useNavigate = () => {
  const clientPropsManager = useClientPropsManager()

  const navigate = useCallback(
    async (path: string) => {
      const currentProps = clientPropsManager.currentProps

      // TODO: make propsService dependency injectable so we can do things like prefetching, caching, etc.
      const { props: updatedProps, finalPath } =
        await exampleClientPropsService.fetchPropsFollowRedirects(path, currentProps)

      clientPropsManager.updateProps(updatedProps)

      history.pushState(clientPropsManager.currentProps, "", finalPath)
    },
    [clientPropsManager],
  )

  return navigate
}
