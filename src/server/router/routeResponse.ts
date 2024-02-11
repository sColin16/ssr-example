import { Router } from "express"
import { RouteResponseResolver } from "server/service/routeResponse"

export type PageRouterOptions = {
  routeResponseResolver: RouteResponseResolver
}

export const buildRouteResponseRouter = ({
  routeResponseResolver,
}: PageRouterOptions) => {
  const router = Router()

  router.get("*", async (req, res) => {
    const routeResponse = await routeResponseResolver(req)

    switch (routeResponse.type) {
      case "redirect":
        // TODO: make these status codes configurable in these response objects
        return res
          .location(routeResponse.location)
          .header(routeResponse.headers)
          .sendStatus(routeResponse.statusCode)

      case "clientProps":
        return res
          .status(routeResponse.statusCode)
          .header(routeResponse.headers)
          .send(routeResponse.body)
    }
  })

  return router
}
