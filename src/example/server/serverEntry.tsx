import express from "express"
import compression from "compression"
import { routePropsRouter, routeResponseRouter } from "./container"

const PORT = 3000
const app = express()

// Compress all responses
app.use(compression())

// Serve the clientEntry.js file that should be built to this directory
app.use(express.static("dist/public"))

// Endpoint for fetching props
app.use(routePropsRouter)

// Endpoint for rendering page HTML
app.use(routeResponseRouter)

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
