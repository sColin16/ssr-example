import { Router } from "express"
import { RouteResponseResolver } from "server/service/routeResponse"

export type PageRouterOptions = {
  routeResponseResolver: RouteResponseResolver
}

export const buildRouteResponseRouter = ({ routeResponseResolver }: PageRouterOptions) => {
  const router = Router()

  router.get("*", async (req, res) => {
    const routeResponse = await routeResponseResolver(req)

    switch (routeResponse.type) {
      case 'redirect':
        // TODO: make these status codes configurable in these response objects
        return res.location(routeResponse.location).sendStatus(routeResponse.statusCode)

      case 'client':
        return res.status(routeResponse.statusCode).send(routeResponse.body)
    }
  })

  return router
}
