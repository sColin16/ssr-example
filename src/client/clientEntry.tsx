import { hydrate } from "react-dom"
import { App, AppProps, SiteProps } from "shared/components/App"
import { ClientPropsManager } from "shared/service/props-manager"

declare const siteProps: SiteProps

const clientPropsManager = new ClientPropsManager(siteProps)

const appProps: AppProps = {
  clientPropsManager,
}

hydrate(<App {...appProps} />, document.getElementById("app"))
