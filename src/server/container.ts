import { Router } from "express"
import { Container } from "mesh-di"
import {
  PartialRoutePropsResolver,
  resolveRoutePropsPartial,
} from "./service/routeProps"
import { buildRoutePropsRouter } from "./router/routeProps"
import {
  RouteResponseResolver,
  resolveResponseFromRequest,
} from "./service/routeResponse"
import { buildRouteResponseRouter } from "./router/routeResponse"

type Catalog = {
  partialRoutePropsResolver: PartialRoutePropsResolver
  routeResponseResolver: RouteResponseResolver
  routePropsRouter: Router
  routeResponseRouter: Router
}

const container = new Container<Catalog>()

container.register("routePropsRouter", {
  deps: ["partialRoutePropsResolver"],
  func: buildRoutePropsRouter,
})

container.register("routeResponseRouter", {
  deps: ["routeResponseResolver"],
  func: buildRouteResponseRouter,
})

container.registerStatic("partialRoutePropsResolver", resolveRoutePropsPartial)
container.registerStatic("routeResponseResolver", resolveResponseFromRequest)

export const routePropsRouter = container.resolve("routePropsRouter")
export const routeResponseRouter = container.resolve("routeResponseRouter")
