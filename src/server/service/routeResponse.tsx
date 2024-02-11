import {
  ClientProps,
  RedirectProps,
  RedirectStatusCode,
  RouteProps,
  resolveRouteProps,
} from "./routeProps"
import { ClientPropsManager } from "shared/service/props-manager"
import { renderToString } from "react-dom/server"
import { AppBody, AppProps, SiteProps } from "shared/components/AppBody"
import { AppHead } from "shared/components/AppHead"
import { Request } from "express"

export type RouteResponse = ClientResponse | RedirectResponse

export type RouteResponseResolver = (req: Request) => Promise<RouteResponse>

export type ClientResponse = {
  type: "client"
  statusCode: number
  body: string
}

export type RedirectResponse = {
  type: "redirect"
  statusCode: RedirectStatusCode
  location: string
}

export const resolveResponseFromRequest = async (req: Request): Promise<RouteResponse> => {
  const routeProps = await resolveRouteProps(req)

  return resolveResponseFromProps(routeProps)
}

export const resolveResponseFromProps = (routeProps: RouteProps): RouteResponse => {
  switch (routeProps.type) {
    case "client":
      return resolveClientResponse(routeProps)

    case "redirect":
      return resolveRedirectResponse(routeProps)
  }
}

const resolveClientResponse = (clientProps: ClientProps): ClientResponse => {
  const clientPropsManager = new ClientPropsManager(clientProps.props)
  const appProps: AppProps = {
    clientPropsManager,
  }

  const head = renderToString(<AppHead {...appProps} />)
  const body = renderToString(<AppBody {...appProps} />)

  const htmlString = html(head, body, clientProps.props)

  return {
    type: "client",
    statusCode: clientProps.statusCode,
    body: htmlString,
  }
}

const resolveRedirectResponse = (
  redirectProps: RedirectProps,
): RedirectResponse => {
  return {
    type: "redirect",
    statusCode: redirectProps.statusCode,
    location: redirectProps.location,
  }
}

export const html = (head: string, body: string, props: SiteProps) => {
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
