import { Request } from "express"
import { SiteProps } from "shared/components/AppBody"

export type RouteProps = ClientProps | RedirectProps
export type PartialRouteProps = PartialClientProps | RedirectProps

export type RoutePropsResolver = (req: Request) => Promise<RouteProps>
export type PartialRoutePropsResolver = (req: Request) => Promise<PartialRouteProps>

// TODO: add status code to this for the HTML response codes
// TODO: add headers to this as well
export type ClientProps = {
  type: "client"
  props: SiteProps
}

export type RedirectProps = {
  type: "redirect"
  location: string
}

export type PartialClientProps = {
  type: "client"
  props: Partial<SiteProps>
}

export const resolveRouteProps = async (req: Request): Promise<RouteProps> => {
  const [color, numberStr] = req.url.split("/").slice(1, 3)

  const number = Number(numberStr)

  if (color === "silver") {
    return {
      type: "redirect",
      location: "/gold/24",
    }
  }

  return {
    type: "client",
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
        props: {
          head: headProps,
          layout: layoutProps,
          page: pageProps,
        },
      }
  }
}
