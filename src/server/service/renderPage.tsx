import { Request } from "express";
import { App, AppProps } from "shared/components/App";
import { PropsResolver } from "./props";
import { renderToString } from "react-dom/server";

type RenderPageOptions = {
  resolveProps: PropsResolver
}

export const buildRenderPage = ({ resolveProps }: RenderPageOptions) => {
  const renderPage = async (req: Request): Promise<string> => {
    const props = await resolveProps(req)
    const body = renderToString(<App {...props} />)

    return html(body, props)
  }

  return renderPage
}

export const html = (body: string, props: AppProps) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body style="margin:0">
        <div id="app">${body}</div>
      </body>
      <script>props=${JSON.stringify(props)}</script>
      <script src="client.js" defer></script>
    </html>
  `
}
