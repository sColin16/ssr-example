import { Request } from "express"
import { App, SiteProps } from "shared/components/App"
import { PropsResolver } from "./props"
import { renderToString } from "react-dom/server"
import { ClientPropsManager } from "shared/service/props-manager"

type RenderPageOptions = {
  resolveProps: PropsResolver
}

export const buildRenderPage = ({ resolveProps }: RenderPageOptions) => {
  const renderPage = async (req: Request): Promise<string> => {
    const siteProps = await resolveProps(req)
    const clientPropsManager = new ClientPropsManager(siteProps)
    const appProps = { siteProps, clientPropsManager }
    const body = renderToString(<App {...appProps} />)

    return html(body, siteProps)
  }

  return renderPage
}

export const html = (body: string, props: SiteProps) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body style="margin:0">
        <div id="app">${body}</div>
      </body>
      <script>siteProps=${JSON.stringify(props)}</script>
      <script src="/client.js" defer></script>
    </html>
  `
}
