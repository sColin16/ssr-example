import express from "express"
import compression from "compression"
import { pageRouter, propsRouter } from "./container"

const port = 3000
const app = express()

// Compress all responses
app.use(compression())

// Serve the clientEntry.js file that should be built to this directory
app.use(express.static("dist/public"))

// Endpoint for fetching props
app.use(propsRouter)

// Endpoint for rendering page HTML
app.use(pageRouter)

app.listen(port, () => console.log(`App listening on port ${port}`))
