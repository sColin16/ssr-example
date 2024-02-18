import { requireOrThrow } from "library/shared/utils"
import { ResponseType, RoutePropsResolver, RoutePropsService } from "./types"
import { Request } from "express"

export type TotalPropsFilter<SiteProps, SitePropsSummary> = (
  totalProps: SiteProps,
  clientProps: SitePropsSummary,
) => Partial<SiteProps>

export const DEFAULT_PROPS_SUMMARY_HEADER = "x-client-props"

export class DefaultRoutePropsService<SiteProps, SitePropsSummary>
  implements RoutePropsService<SiteProps>
{
  constructor(
    private readonly propsResolver: RoutePropsResolver<SiteProps>,
    private readonly filterProps: TotalPropsFilter<SiteProps, SitePropsSummary>,
    private readonly parseSitePropsSummary: (
      req: Request,
    ) => SitePropsSummary = sitePropsFromHeader,
  ) {}

  // TODO: should we add the default status codes here as well?
  resolveProps = (req: Request) => {
    return this.propsResolver(req)
  }

  resolvePartialProps = async (req: Request) => {
    const totalProps = await this.resolveProps(req)

    switch (totalProps.type) {
      case ResponseType.Redirect:
        return totalProps

      case ResponseType.ClientProps:
        const sitePropsSummary = this.parseSitePropsSummary(req)
        const partialProps = this.filterProps(
          totalProps.props,
          sitePropsSummary,
        )

        return {
          ...totalProps,
          props: partialProps,
        }
    }
  }
}

export const sitePropsFromHeader = <SitePropsSummary>(
  req: Request,
  headerKey: string = DEFAULT_PROPS_SUMMARY_HEADER,
  parse: (
    header: string | Array<string> | undefined,
  ) => SitePropsSummary = defaultHeaderParse,
) => {
  return parse(req.headers[headerKey])
}

const defaultHeaderParse = <SitePropsSummary>(
  header: string | Array<string> | undefined,
) => {
  const definedHeader = requireOrThrow(
    header,
    new Error("Failed to parse header: header was undefined"),
  )

  return JSON.parse(definedHeader.toString()) as SitePropsSummary
}
