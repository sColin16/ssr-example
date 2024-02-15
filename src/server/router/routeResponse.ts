import { Router } from "express"
import { ResponseType } from "server/service/routeProps/types"
import { RouteResponseService } from "server/service/routeResponse/types"

export type DefaultPageRouterOptions = {
  routeResponseService: RouteResponseService
}

export const defaultRouteResponseRouter = ({
  routeResponseService,
}: DefaultPageRouterOptions) => {
  const router = Router()

  router.get("*", async (req, res) => {
    const routeResponse = await routeResponseService.resolveResponse(req)

    switch (routeResponse.type) {
      case ResponseType.Redirect:
        return res
          .location(routeResponse.location)
          .header(routeResponse.headers)
          .sendStatus(routeResponse.statusCode)

      case ResponseType.ClientProps:
        return res
          .status(routeResponse.statusCode)
          .header(routeResponse.headers)
          .send(routeResponse.body)
    }
  })

  return router
}
