import { createContext } from "react"
import { ClientPropsManager } from "shared/service/props-manager"

export const ClientPropsManagerContext =
  createContext<ClientPropsManager | null>(null)
