import { hydrateRoot } from "react-dom/client"
import {
  AppBody,
  AppHead,
  AppProps,
  SiteProps,
} from "example/shared/components/App"
import { buildWireHistoryManagement } from "library/shared/utils/wire-history-management"
import { DefaultClientPropsManager } from "library/shared/service/clientPropsManager.ts"

declare const siteProps: SiteProps

const clientPropsManager = new DefaultClientPropsManager(siteProps)
const wireHistoryManagement = buildWireHistoryManagement(clientPropsManager)

const appProps: AppProps = {
  clientPropsManager,
}

wireHistoryManagement()

hydrateRoot(document.head, <AppHead {...appProps} />)
hydrateRoot(document.getElementById("appBody")!, <AppBody {...appProps} />)
