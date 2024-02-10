import { useClientPropsManager } from "shared/hooks/use-client-props-manager"
import { useEventListener } from "shared/hooks/use-event-listener"

export const ClientNavigationManager = () => {
  const clientPropsManager = useClientPropsManager()

  // Listen to browser navigation events and update props accordingly
  useEventListener("popstate", (event) => {
    // TODO: be smarter about the props we update, to avoid unnecessary updates
    // TODO: probably put this into some sort of helper that does this, avoid directly calling clientPropsManager
    clientPropsManager.updateProps(event.state)
  })

  return null
}
