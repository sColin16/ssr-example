import { useContext } from "react"
import { ClientPropsManagerContext } from "shared/contexts/propsManager"
import { requireOrThrow } from "shared/utils"

export const useClientPropsManager = () => {
  const clientPropsManager = useContext(ClientPropsManagerContext)

  return requireOrThrow(
    clientPropsManager,
    new Error("Error accessing the client props manager context"),
  )
}
