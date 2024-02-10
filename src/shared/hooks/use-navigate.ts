import { propsService } from "shared/service/props"
import { useCallback } from "react"
import { useClientPropsManager } from "./use-client-props-manager"

export const useNavigate = () => {
  const clientPropsManager = useClientPropsManager()

  const navigate = useCallback(
    async (path: string) => {
      const currentProps = clientPropsManager.currentProps

      // TODO: make propsService dependency injectable so we can do things like prefetching, caching, etc.
      const updatedProps = await propsService.fetchProps(path, currentProps)

      clientPropsManager.updateProps(updatedProps)

      history.pushState(clientPropsManager.currentProps, "", path)
    },
    [clientPropsManager],
  )

  return navigate
}
