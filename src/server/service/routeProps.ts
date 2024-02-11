import { Request } from "express"
import { SiteProps } from "shared/components/AppBody"
import { isNil } from "shared/utils"
import { SitePropsSummary, resolvePartialProps } from "./partialProps"

export type RouteProps = ClientProps | RedirectProps
export type PartialRouteProps = PartialClientProps | RedirectProps

export type RoutePropsResolver = (req: Request) => Promise<RouteProps>
export type PartialRoutePropsResolver = (
  req: Request,
) => Promise<PartialRouteProps>

export type ClientProps = {
  type: "clientProps"
  statusCode: number // TODO: should we assign specific status codes to prevent this from including redirects?
  headers?: Record<string, string>
  props: SiteProps
}

export type RedirectProps = {
  type: "redirect"
  statusCode: RedirectStatusCode
  headers?: Record<string, string>
  location: string
}

export type PartialClientProps = {
  type: "clientProps"
  statusCode: number
  headers?: Record<string, string>
  props: Partial<SiteProps>
}

export type RedirectStatusCode = 301 | 302 | 303 | 307 | 308

export const resolveRouteProps = async (req: Request): Promise<RouteProps> => {
  const [color, numberStr] = req.url.split("/").slice(1, 3)

  const number = Number(numberStr)

  if (color === "silver") {
    return {
      type: "redirect",
      statusCode: 308,
      headers: {
        "X-Custom-Header": "Redirect header value",
      },
      location: "/gold/24",
    }
  }

  if (isNil(color) || isNil(numberStr)) {
    return {
      type: "clientProps",
      statusCode: 404,
      headers: {
        "X-Custom-Header": "Not found header value",
      },
      props: {
        layout: {
          backgroundColor: "white",
        },
        page: {
          initialCounterValue: 0,
        },
      },
    }
  }

  return {
    type: "clientProps",
    statusCode: 200,
    headers: {
      "X-Custom-Header": "200 OK header value",
    },
    props: {
      layout: {
        backgroundColor: color,
      },
      page: {
        initialCounterValue: number,
      },
    },
  }
}

export const resolveRoutePropsPartial = async (
  req: Request,
): Promise<PartialRouteProps> => {
  // TODO: probably make this a configurable function and build this function
  const totalProps = await resolveRouteProps(req)

  switch (totalProps.type) {
    case "redirect":
      return totalProps

    case "clientProps":
      // TODO: do some error handling here?
      const clientProps = JSON.parse(
        req.headers["x-client-props"] as string,
      ) as SitePropsSummary

      const partialProps = resolvePartialProps(totalProps.props, clientProps)

      return {
        type: "clientProps",
        statusCode: totalProps.statusCode,
        headers: totalProps.headers,
        props: partialProps,
      }
  }
}
