import express from "express"
import { html } from "./html"
import { renderToString } from "react-dom/server"
import { resolveProps } from "./propsResolver"
import { App } from "shared/components/App"

const port = 3000
const server = express()

server.use(express.static("dist"))

server.get("/api/props*", (req, res) => {
  // Update the path to remove the /api/props prefix
  const pagePath = req.url.slice(10)
  req.url = pagePath

  const props = resolveProps(req)

  res.status(200).json(props)
})

server.get("*", (req, res) => {
  const props = resolveProps(req)

  const body = renderToString(<App {...props} />)

  res.send(html(body, props))
})

server.listen(port, () => console.log(`App listening on port ${port}`))
