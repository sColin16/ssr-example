import { SiteProps } from "shared/components/AppBody"
import { ResponseType, RouteProps } from "./types"
import { isNil } from "shared/utils"
import { DefaultRoutePropsService, filterPropsFromPredicate } from "."
import { Request } from 'express'
import { SitePropsSummary } from "shared/service/clientProps/example"

const exampleRoutePropsResolver = async (req: Request): Promise<RouteProps<SiteProps>> => {
  const [color, numberStr] = req.url.split("/").slice(1, 3)

  const number = Number(numberStr)

  if (color === "silver") {
    return {
      type: ResponseType.Redirect,
      statusCode: 308,
      headers: {
        "X-Custom-Header": "Redirect header value",
      },
      location: "/gold/24",
    }
  }

  if (isNil(color) || isNil(numberStr)) {
    return {
      type: ResponseType.ClientProps,
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
    type: ResponseType.ClientProps,
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

const exampleFilterProps = filterPropsFromPredicate((totalProps: SiteProps, clientProps: SitePropsSummary) => {
  const colorMatches = totalProps.layout.backgroundColor === clientProps.color
  const numMatches =
    totalProps.page.initialCounterValue === clientProps.initialValue

  return {
    layout: !colorMatches,
    page: !numMatches,
  }
})

export const exampleRoutePropsService = new DefaultRoutePropsService(exampleRoutePropsResolver, exampleFilterProps)
