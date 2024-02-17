import { hydrateRoot } from "react-dom/client"
import {
  AppBody,
  AppHead,
  AppProps,
  SiteProps,
} from "example/shared/components/App"
import { DefaultClientPropsManager } from "library/shared/service/clientPropsManager"
import { StarterHistoryManager } from "library/shared/service/historyManager"

declare const siteProps: SiteProps

const clientPropsManager = new DefaultClientPropsManager(siteProps)
const historyManager = new StarterHistoryManager(clientPropsManager)

const appProps: AppProps = {
  clientPropsManager,
  historyManager,
}

historyManager.initialize()

hydrateRoot(document.head, <AppHead {...appProps} />)
hydrateRoot(document.getElementById("appBody")!, <AppBody {...appProps} />)
