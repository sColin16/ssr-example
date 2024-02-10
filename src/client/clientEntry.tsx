import { hydrate } from "react-dom"
import { App, AppProps, SiteProps } from "shared/components/App"
import { AppHead } from "shared/components/AppHead"
import { ClientPropsManager } from "shared/service/props-manager"

declare const siteProps: SiteProps

const clientPropsManager = new ClientPropsManager(siteProps)

const appProps: AppProps = {
  clientPropsManager,
}

hydrate(<AppHead {...appProps} />, document.head)
hydrate(<App {...appProps} />, document.getElementById("app"))
