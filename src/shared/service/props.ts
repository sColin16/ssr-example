import { PartialRouteProps } from "server/service/routeProps"
import { SiteProps } from "shared/components/AppBody"

export const fetchProps = async (
  path: string,
  currProps: SiteProps,
): Promise<PartialRouteProps> => {
  const response = await fetch(`/api/props${path}`, {
    headers: {
      // TODO: send some abbreviated version of the props instead of the entire props payload
      "X-Client-Props": JSON.stringify(currProps),
    },
  })
  const props = (await response.json()) as PartialRouteProps

  return props
}

export type FetchPropsResponse = {
  props: Partial<SiteProps>
  finalPath: string
}

export const fetchPropsFollowRedirects = async (
  path: string,
  currProps: SiteProps,
): Promise<FetchPropsResponse> => {
  let newPath = path
  let newProps = await fetchProps(newPath, currProps)

  while (newProps.type === "redirect") {
    // TODO: also need to detect if this is an absolute redirect, not just relative
    // TODO: probably should have a circuit breaker if there is a redirect loop
    newPath = newProps.location
    newProps = await fetchProps(newPath, currProps)
  }

  return {
    props: newProps.props,
    finalPath: newPath,
  }
}
