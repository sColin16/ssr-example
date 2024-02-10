import { hydrate } from "react-dom"

import { App, SiteProps, AppProps } from "shared/components/App"
import { ClientPropsManager } from "shared/service/props-manager"

declare const siteProps: SiteProps

const clientPropsManager = new ClientPropsManager(siteProps)
const appProps: AppProps = { siteProps, clientPropsManager }

hydrate(<App {...appProps} />, document.getElementById("app"))
