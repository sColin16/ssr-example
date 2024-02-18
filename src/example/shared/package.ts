import { buildSharedPackage } from "library/shared/package"
import {
  exampleClientPropsService,
  exampleFilterProps,
  summarizeSiteProps,
} from "./service/clientProps"
import { AppProps, SiteProps } from "./components/App"
import { DefaultClientPropsManager } from "library/shared/service/clientPropsManager"
import { PropsSummaryHistoryManager } from "library/shared/service/historyManager"

export const {
  ClientProvider,
  Link,
  useRouter,
  buildAggregateSubscribedComponent,
  buildSubscribedComponent,
} = buildSharedPackage(exampleClientPropsService)

export const buildAppProps = (props: SiteProps): AppProps => {
  const clientPropsManager = new DefaultClientPropsManager(props)
  const historyManager = new PropsSummaryHistoryManager(
    clientPropsManager,
    summarizeSiteProps,
    exampleFilterProps,
  )

  const appProps = {
    clientPropsManager,
    historyManager,
  }

  return appProps
}
