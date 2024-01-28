import express from "express"
import { html } from "./html"
import { renderToString } from "react-dom/server"
import { App } from "shared/components/App"
import { resolveProps } from "./service/props"
import compression from 'compression'

const port = 3000
const server = express()

server.use(compression())
server.use(express.static("dist/public"))

server.get("/api/props*", async (req, res) => {
  // Update the path to remove the /api/props prefix
  const pagePath = req.url.slice(10)
  req.url = pagePath

  const props = await resolveProps(req)

  res.status(200).json(props)
})

server.get("*", async (req, res) => {
  const props = await resolveProps(req)

  const body = renderToString(<App {...props} />)

  res.send(html(body, props))
})

server.listen(port, () => console.log(`App listening on port ${port}`))
