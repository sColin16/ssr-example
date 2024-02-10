import { hydrateRoot } from "react-dom/client"
import { AppBody, AppProps, SiteProps } from "shared/components/AppBody"
import { AppHead } from "shared/components/AppHead"
import { ClientPropsManager } from "shared/service/props-manager"

declare const siteProps: SiteProps

const clientPropsManager = new ClientPropsManager(siteProps)

const appProps: AppProps = {
  clientPropsManager,
}

hydrateRoot(document.head, <AppHead {...appProps} />)
hydrateRoot(document.getElementById("appBody")!, <AppBody {...appProps} />)
