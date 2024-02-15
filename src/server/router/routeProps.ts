import { Router } from "express"
import { RoutePropsService } from "server/service/routeProps/types"

export type DefaultRoutePropsRouterOptions<SiteProps> = {
  routePropsService: RoutePropsService<SiteProps>
  baseUrl?: string
}

const DEFAULT_BASE_URL = "/api/props"

export const defaultRoutePropsRouter = <SiteProps>({
  routePropsService,
  baseUrl = DEFAULT_BASE_URL,
}: DefaultRoutePropsRouterOptions<SiteProps>) => {
  const router = Router()

  router.get(`${baseUrl}*`, async (req, res) => {
    // Remove the base URL prefix
    const pagePath = req.url.slice(baseUrl.length)
    req.url = pagePath

    const routeProps = await routePropsService.resolvePartialProps(req)
    const headers = routeProps.headers ?? {}

    res.status(200).header(headers).json(routeProps)
  })

  return router
}
