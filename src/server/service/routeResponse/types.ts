import { RedirectStatusCode, ResponseType } from "../routeProps/types"
import { Headers } from "../routeProps/types"
import { Request } from "express"

export type RouteResponseService = {
  resolveResponse: RouteResponseResolver
}

export type RouteResponseResolver = (req: Request) => Promise<RouteResponse>

export type RouteResponse = ClientResponse | RedirectResponse

export type ClientResponse = {
  type: ResponseType.ClientProps
  statusCode: number
  headers: Headers
  body: string
}

export type RedirectResponse = {
  type: ResponseType.Redirect
  statusCode: RedirectStatusCode
  headers: Headers
  location: string
}
