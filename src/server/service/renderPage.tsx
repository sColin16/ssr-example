import { Request } from "express"
import { App, AppProps, SiteProps } from "shared/components/App"
import { PropsResolver } from "./props"
import { renderToString } from "react-dom/server"
import { ClientPropsManager } from "shared/service/props-manager"
import { AppHead } from "shared/components/AppHead"

type RenderPageOptions = {
  resolveProps: PropsResolver
}

export const buildRenderPage = ({ resolveProps }: RenderPageOptions) => {
  const renderPage = async (req: Request): Promise<string> => {
    const siteProps = await resolveProps(req)
    const clientPropsManager = new ClientPropsManager(siteProps)
    const appProps: AppProps = { clientPropsManager }
    const body = renderToString(<App {...appProps} />)
    const head = renderToString(<AppHead {...appProps} />)

    return html(body, head, siteProps)
  }

  return renderPage
}

export const html = (body: string, head: string, props: SiteProps) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>${head}</head>
      <body style="margin:0">
        <div id="app">${body}</div>
        <script>siteProps=${JSON.stringify(props)}</script>
        <script src="/client.js" defer></script>
      </body>
    </html>
  `
}
