import { Router } from "express"
import { PartialRoutePropsResolver } from "server/service/routeProps"

export type RoutePropsRouterOptions = {
  partialRoutePropsResolver: PartialRoutePropsResolver
  baseUrl?: string
}

const DEFAULT_BASE_URL = "/api/props"

export const buildRoutePropsRouter = ({
  partialRoutePropsResolver,
  baseUrl = DEFAULT_BASE_URL,
}: RoutePropsRouterOptions) => {
  const router = Router()

  router.get(`${baseUrl}*`, async (req, res) => {
    // Remove the base URL prefix
    const pagePath = req.url.slice(baseUrl.length)
    req.url = pagePath

    const routeProps = await partialRoutePropsResolver(req)
    const headers = routeProps.headers ?? {}

    res.status(200).header(headers).json(routeProps)
  })

  return router
}
