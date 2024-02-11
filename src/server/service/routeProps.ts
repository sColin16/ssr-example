import { Request } from "express"
import { SiteProps } from "shared/components/AppBody"
import { isNil } from "shared/utils"

export type RouteProps = ClientProps | RedirectProps
export type PartialRouteProps = PartialClientProps | RedirectProps

export type RoutePropsResolver = (req: Request) => Promise<RouteProps>
export type PartialRoutePropsResolver = (req: Request) => Promise<PartialRouteProps>

// TODO: add status code to this for the HTML response codes
// TODO: add headers to this as well
export type ClientProps = {
  type: "client"
  statusCode: number // TODO: should we assign specific status codes to prevent this from including redirects?
  props: SiteProps
}

export type RedirectProps = {
  type: "redirect"
  statusCode: RedirectStatusCode
  location: string
}

export type PartialClientProps = {
  type: "client"
  statusCode: number
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
      location: "/gold/24",
    }
  }

  if (isNil(color) || isNil(numberStr)) {
    return {
      type: "client",
      statusCode: 404,
      props: {
        layout: {
          backgroundColor: 'white'
        },
        page: {
          initialCounterValue: 0
        },
        head: {
          title: "Page not found"
        }
      }
    }
  }

  return {
    type: "client",
    statusCode: 200,
    props: {
      layout: {
        backgroundColor: color,
      },
      page: {
        initialCounterValue: number,
      },
      head: {
        title: `${color} - ${number}`,
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

    case "client":
      // TODO: do some error handling here?
      const clientProps = JSON.parse(
        req.headers["x-client-props"] as string,
      ) as SiteProps

      // TODO: have a more general way for doing these comparisons
      const headProps =
        clientProps.head.title === totalProps.props.head.title
          ? undefined
          : totalProps.props.head
      const layoutProps =
        clientProps.layout.backgroundColor ===
        totalProps.props.layout.backgroundColor
          ? undefined
          : totalProps.props.layout
      const pageProps =
        clientProps.page.initialCounterValue ===
        totalProps.props.page.initialCounterValue
          ? undefined
          : totalProps.props.page

      return {
        type: "client",
        statusCode: totalProps.statusCode,
        props: {
          head: headProps,
          layout: layoutProps,
          page: pageProps,
        },
      }
  }
}
