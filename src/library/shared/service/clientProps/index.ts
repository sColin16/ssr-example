import {
  PartialRouteProps,
  ResponseType,
  Headers,
} from "library/server/routeProps/types"
import { ClientPropsService } from "./types"
import { DEFAULT_PROPS_SUMMARY_HEADER } from "library/server/routeProps/service"

export class DefaultClientPropsService<SiteProps, SitePropsSummary>
  implements ClientPropsService<SiteProps>
{
  constructor(
    private readonly summarizeProps: (props: SiteProps) => SitePropsSummary,
    private readonly serializeSummaryToHeaders: (
      propsSummary: SitePropsSummary,
    ) => Headers = defaultSerializeSummaryToHeaders,
    private readonly redirectLimit: number = 5,
    private readonly BASE_URL = "/api/props",
  ) {}

  fetchProps = async (path: string, currProps: SiteProps) => {
    const summarizedProps = this.summarizeProps(currProps)
    const headers = this.serializeSummaryToHeaders(summarizedProps)
    const response = await fetch(`${this.BASE_URL}${path}`, {
      headers,
    })

    const props = (await response.json()) as PartialRouteProps<SiteProps>

    return props
  }

  fetchPropsFollowRedirects = async (path: string, currProps: SiteProps) => {
    let redirectCount = 0
    let newPath = path
    let newProps = await this.fetchProps(newPath, currProps)

    while (newProps.type === ResponseType.Redirect) {
      if (redirectCount >= this.redirectLimit) {
        throw new Error(
          `Redirect limit of ${this.redirectLimit} hit, aborting prop fetching`,
        )
      }

      // TODO: also need to detect if this is an absolute redirect, not just relative
      newPath = newProps.location
      newProps = await this.fetchProps(newPath, currProps)
    }

    return {
      props: newProps.props,
      finalPath: newPath,
    }
  }
}

const defaultSerializeSummaryToHeaders = <SitePropsSummary>(
  propsSummary: SitePropsSummary,
  headerKey: string = DEFAULT_PROPS_SUMMARY_HEADER,
  serializeSummary: (propsSummary: SitePropsSummary) => string = JSON.stringify,
): Headers => {
  return {
    [headerKey]: serializeSummary(propsSummary),
  }
}
