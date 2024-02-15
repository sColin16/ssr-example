import { Router } from "express"
import { Container } from "mesh-di"
import { defaultRoutePropsRouter } from "./router/routeProps"
import { defaultRouteResponseRouter } from "./router/routeResponse"
import { exampleRoutePropsService } from "./service/routeProps/example"
import { exampleRouteResponseService } from "./service/routeResponse/example"
import { RoutePropsService } from "./service/routeProps/types"
import { RouteResponseService } from "./service/routeResponse/types"
import { SiteProps } from "shared/components/AppBody"

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
