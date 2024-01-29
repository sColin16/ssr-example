import express from "express"
import { resolveProps } from "./service/props"
import compression from "compression"
import propsRouter from "./router/props"
import pageRouter from "./router/page"
import { buildRenderPage } from "./service/renderPage"

const port = 3000
const app = express()

// Compress all responses
app.use(compression())

// Serve the clientEntry.js file that should be built to this directory
app.use(express.static("dist/public"))

// Endpoint for fetching props
app.use(
  propsRouter({
    resolveProps,
  }),
)

app.use(
  pageRouter({
    renderPage: buildRenderPage({ resolveProps }),
  }),
)

app.listen(port, () => console.log(`App listening on port ${port}`))
