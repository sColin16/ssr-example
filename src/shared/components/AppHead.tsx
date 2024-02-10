import { ClientPropsManagerContext } from "shared/contexts/propsManager"
import { AppProps } from "./App"
import { HeadManager } from "./Managers"

export const AppHead = ({ clientPropsManager }: AppProps) => {
  return (
    <ClientPropsManagerContext.Provider value={clientPropsManager}>
      <HeadManager />
    </ClientPropsManagerContext.Provider>
  )
}