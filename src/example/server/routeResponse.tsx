import {
  AppBody,
  AppHead,
  SiteProps,
} from "example/shared/components/App"
import { renderToString } from "react-dom/server"
import { ClientProps } from "library/server/routeProps/types"
import { DefaultRouteResponseService } from "library/server/routeResponse/service"
import { exampleRoutePropsService } from "./routeProps"
import { buildAppProps } from "example/shared/package"

const exampleRenderClientProps = (clientProps: ClientProps<SiteProps>) => {
  const appProps = buildAppProps(clientProps.props)

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
