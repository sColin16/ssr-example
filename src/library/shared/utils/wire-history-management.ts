import { ClientPropsManager } from "library/shared/service/clientPropsManager.ts/types"

export const buildWireHistoryManagement = <SiteProps>(
  clientPropsManager: ClientPropsManager<SiteProps>,
) => {
  const wireHistoryManagement = () => {
    // Set the initial state so that users can navigate back to initial render
    history.replaceState(
      clientPropsManager.readCurrentProps(),
      "",
      document.location.href,
    )

    // Listen to browser navigation events and update props accordingly
    addEventListener("popstate", (event) => {
      // TODO: be smarter about the props we update, to avoid unnecessary updates
      // TODO: probably put this into some sort of helper that does this, avoid directly calling clientPropsManager
      clientPropsManager.updateProps(event.state)
    })
  }

  return wireHistoryManagement
}
