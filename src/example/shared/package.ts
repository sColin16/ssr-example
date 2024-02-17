import { buildSharedPackage } from "library/shared/package"
import { exampleClientPropsService } from "./service/clientProps"
import { AppProps, SiteProps } from "./components/App"
import { DefaultClientPropsManager } from "library/shared/service/clientPropsManager"
import { StarterHistoryManager } from "library/shared/service/historyManager"

export const {
  ClientProvider,
  Link,
  useNavigate,
  buildAggregateSubscribedComponent,
  buildSubscribedComponent,
} = buildSharedPackage(exampleClientPropsService)

export const buildAppProps = (props: SiteProps): AppProps => {
  const clientPropsManager = new DefaultClientPropsManager(props)
  const historyManager = new StarterHistoryManager(clientPropsManager)

  const appProps = {
    clientPropsManager,
    historyManager,
  }

  return appProps
}
