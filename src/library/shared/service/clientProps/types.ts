import { PartialRouteProps } from "library/server/routeProps/types"

export type ClientPropsService<SiteProps> = {
  fetchProps: (
    path: string,
    currProps: SiteProps,
  ) => Promise<PartialRouteProps<SiteProps>>
  fetchPropsFollowRedirects: (
    path: string,
    currProps: SiteProps,
  ) => Promise<FetchPropsFollowRedirectsResponse<SiteProps>>
}

export type FetchPropsFollowRedirectsResponse<SiteProps> = {
  props: Partial<SiteProps>
  finalPath: string
}
