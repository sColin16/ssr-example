import { Request } from "express"
import { AppBody, AppProps, SiteProps } from "shared/components/AppBody"
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

    const head = renderToString(<AppHead {...appProps} />)
    const body = renderToString(<AppBody {...appProps} />)

    return html(head, body, siteProps)
  }

  return renderPage
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
