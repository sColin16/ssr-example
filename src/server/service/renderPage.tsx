import { Request } from "express"
import { App, LayerProps } from "shared/components/App"
import { PropsResolver } from "./props"
import { renderToString } from "react-dom/server"
import { ClientPropsManager } from "shared/service/props-manager"

type RenderPageOptions = {
  resolveProps: PropsResolver
}

export const buildRenderPage = ({ resolveProps }: RenderPageOptions) => {
  const renderPage = async (req: Request): Promise<string> => {
    const layerProps = await resolveProps(req)
    const clientPropsManager = new ClientPropsManager(layerProps)
    const appProps = { layerProps, clientPropsManager }
    const body = renderToString(<App {...appProps} />)

    return html(body, layerProps)
  }

  return renderPage
}

export const html = (body: string, props: LayerProps) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body style="margin:0">
        <div id="app">${body}</div>
      </body>
      <script>layerProps=${JSON.stringify(props)}</script>
      <script src="/client.js" defer></script>
    </html>
  `
}
