import { AppBody, AppProps, SiteProps } from "shared/components/AppBody"
import { DefaultRouteResponseService } from "."
import { exampleRoutePropsService } from "../routeProps/example"
import { ClientProps } from "../routeProps/types"
import { ClientPropsManager } from "shared/service/props-manager"
import { renderToString } from "react-dom/server"
import { AppHead } from "shared/components/AppHead"

const exampleRenderClientProps = (clientProps: ClientProps<SiteProps>) => {
  const clientPropsManager = new ClientPropsManager(clientProps.props)
  const appProps: AppProps = {
    clientPropsManager,
  }

  const head = renderToString(<AppHead {...appProps} />)
  const body = renderToString(<AppBody {...appProps} />)

  const htmlString = html(head, body, clientProps.props)

  return htmlString
}

const html = (head: string, body: string, props: SiteProps) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>${head}</head>
    <body style="margin:0">
      <div id="appBody">${body}</div>
      <script>siteProps=${JSON.stringify(props)}</script>
      <script src="/client.js" defer></script>
    </body>
  </html>
`
}

export const exampleRouteResponseService = new DefaultRouteResponseService(
  exampleRoutePropsService,
  exampleRenderClientProps,
)
