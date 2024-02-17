import { createContext } from "react"
import { ClientPropsManager } from "library/shared/service/clientPropsManager/types"

export function buildClientPropsManagerContext<SiteProps>() {
  return createContext<ClientPropsManager<SiteProps> | null>(null)
}
