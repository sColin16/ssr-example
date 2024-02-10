import { useEffect } from "react"
import { useClientPropsManager } from "shared/hooks/use-client-props-manager"
import { useEventListener } from "shared/hooks/use-event-listener"

export const ClientNavigationManager = () => {
  const clientPropsManager = useClientPropsManager()

  // Register subscription to handle navigation with the browser history APIs
  useEffect(() => {
    clientPropsManager.registerSubscription((newProps) => {
      if (newProps.state.type === 'pathNavigate') {
        // TODO: consider doing this as part of useNavigate so we don't need to have the different state types
        history.pushState(newProps.allProps, "", newProps.state.path)
      }
    })
  }, [clientPropsManager])

  // Listen to browser navigation events and update props accordingly
  useEventListener("popstate", (event) => {
    // TODO: be smarter about the props we update, to avoid unnecessary updates
    // TODO: probably put this into some sort of helper that does this, avoid directly calling clientPropsManager
    clientPropsManager.updateProps({
      updatedProps: event.state,
      state: {
        type: 'forwardBack'
      }
    })
  })

  return null
}
