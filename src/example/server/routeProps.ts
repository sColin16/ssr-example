import { SiteProps } from "example/shared/components/App"
import { isNil } from "library/shared/utils"
import { Request } from "express"
import { ResponseType, RouteProps } from "library/server/routeProps/types"
import {
  DefaultRoutePropsService,
  filterPropsFromPredicate,
} from "library/server/routeProps/service"
import { SitePropsSummary } from "example/shared/service/clientProps"

const exampleRoutePropsResolver = async (
  req: Request,
): Promise<RouteProps<SiteProps>> => {
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

const exampleFilterProps = filterPropsFromPredicate(
  (totalProps: SiteProps, clientProps: SitePropsSummary) => {
    const colorMatches = totalProps.layout.backgroundColor === clientProps.color
    const numMatches =
      totalProps.page.initialCounterValue === clientProps.initialValue

    return {
      layout: !colorMatches,
      page: !numMatches,
    }
  },
)

export const exampleRoutePropsService = new DefaultRoutePropsService(
  exampleRoutePropsResolver,
  exampleFilterProps,
)
