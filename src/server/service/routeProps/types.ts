import { Request } from "express"

export type RoutePropsService<SiteProps> = {
  resolveProps: RoutePropsResolver<SiteProps>
  resolvePartialProps: PartialRoutePropsResolver<SiteProps>
}

export type RoutePropsResolver<SiteProps> = (
  req: Request,
) => Promise<RouteProps<SiteProps>>

export type PartialRoutePropsResolver<SiteProps> = (
  req: Request,
) => Promise<PartialRouteProps<SiteProps>>

export type RouteProps<SiteProps> = ClientProps<SiteProps> | RedirectProps
export type PartialRouteProps<SiteProps> =
  | PartialClientProps<SiteProps>
  | RedirectProps

export type ClientProps<SiteProps> = {
  type: ResponseType.ClientProps
  statusCode: number // TODO: should we assign specific status codes to prevent this from including redirects?
  headers?: Headers
  props: SiteProps
}

export type RedirectProps = {
  type: ResponseType.Redirect
  statusCode: RedirectStatusCode
  headers?: Headers
  location: string
}

export type PartialClientProps<SiteProps> = Omit<
  ClientProps<SiteProps>,
  "props"
> & {
  props: Partial<SiteProps>
}

export type Headers = Record<string, string>
export type RedirectStatusCode = 301 | 302 | 303 | 307 | 308

export enum ResponseType {
  ClientProps = "clientProps",
  Redirect = "redirect",
}
