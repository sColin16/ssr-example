import { Request } from "express"
import {
  ClientProps,
  RedirectProps,
  ResponseType,
  RouteProps,
  RoutePropsService,
} from "../routeProps/types"
import { ClientResponse, RedirectResponse, RouteResponse } from "./types"

export class DefaultRouteResponseService<SiteProps> {
  constructor(
    private readonly routePropsService: RoutePropsService<SiteProps>,
    private readonly renderClientProps: (
      clientProps: ClientProps<SiteProps>,
    ) => string,
  ) {}

  resolveResponse = async (req: Request) => {
    const routeProps = await this.routePropsService.resolveProps(req)

    return this.resolveResponseFromProps(routeProps)
  }

  private resolveResponseFromProps = (
    routeProps: RouteProps<SiteProps>,
  ): RouteResponse => {
    switch (routeProps.type) {
      case ResponseType.ClientProps:
        return this.resolveClientResponse(routeProps)

      case ResponseType.Redirect:
        return this.resolveRedirectResponse(routeProps)
    }
  }

  private resolveClientResponse = (
    clientProps: ClientProps<SiteProps>,
  ): ClientResponse => {
    const htmlString = this.renderClientProps(clientProps)

    return {
      type: ResponseType.ClientProps,
      statusCode: clientProps.statusCode,
      headers: clientProps.headers ?? {},
      body: htmlString,
    }
  }

  private resolveRedirectResponse = (
    redirectProps: RedirectProps,
  ): RedirectResponse => {
    return {
      type: ResponseType.Redirect,
      statusCode: redirectProps.statusCode,
      headers: redirectProps.headers ?? {},
      location: redirectProps.location,
    }
  }
}
