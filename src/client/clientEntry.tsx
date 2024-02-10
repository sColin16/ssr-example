import { hydrate } from "react-dom"

import { App, LayerProps, AppProps } from "shared/components/App"
import { ClientPropsManager } from "shared/service/props-manager"

declare const layerProps: LayerProps

const clientPropsManager = new ClientPropsManager(layerProps)
const appProps: AppProps = { layerProps, clientPropsManager }

hydrate(<App {...appProps} />, document.getElementById("app"))
