import { AppProps } from "shared/components/App"

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