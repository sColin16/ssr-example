import { createContext } from "react"
import { ClientPropsManager } from "library/shared/service/clientPropsManager.ts/types"

export function buildClientPropsManagerContext<SiteProps>() {
  return createContext<ClientPropsManager<SiteProps> | null>(null)
}
