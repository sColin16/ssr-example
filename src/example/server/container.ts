import { Router } from "express"
import { Container } from "mesh-di"
import { defaultRoutePropsRouter } from "../../library/server/routeProps/router"
import { defaultRouteResponseRouter } from "../../library/server/routeResponse/router"
import { RoutePropsService } from "../../library/server/routeProps/types"
import { RouteResponseService } from "../../library/server/routeResponse/types"
import { SiteProps } from "example/shared/components/App"
import { exampleRoutePropsService } from "./routeProps"
import { exampleRouteResponseService } from "./routeResponse"

type Catalog = {
  routePropsService: RoutePropsService<SiteProps>
  routeResponseService: RouteResponseService
  routePropsRouter: Router
  routeResponseRouter: Router
}

const container = new Container<Catalog>()

container.register("routePropsRouter", {
  deps: ["routePropsService"],
  func: defaultRoutePropsRouter
})

container.register("routeResponseRouter", {
  deps: ["routeResponseService"],
  func: defaultRouteResponseRouter,
})

container.registerStatic("routePropsService", exampleRoutePropsService)
container.registerStatic("routeResponseService", exampleRouteResponseService)

export const routePropsRouter = container.resolve("routePropsRouter")
export const routeResponseRouter = container.resolve("routeResponseRouter")
