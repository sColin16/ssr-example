import { hydrateRoot } from "react-dom/client"
import {
  AppBody,
  AppHead,
  SiteProps,
} from "example/shared/components/App"
import { buildAppProps } from "example/shared/package"

declare const siteProps: SiteProps

const appProps = buildAppProps(siteProps)

appProps.historyManager.initialize()

hydrateRoot(document.head, <AppHead {...appProps} />)
hydrateRoot(document.getElementById("appBody")!, <AppBody {...appProps} />)
