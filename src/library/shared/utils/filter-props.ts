import { TotalPropsFilter } from "library/server/routeProps/service"
import { filterByKey } from "."

export const filterPropsFromPredicate = <
  SiteProps extends object,
  SitePropsSummary,
>(
  getPredicate: (
    totalProps: SiteProps,
    clientProps: SitePropsSummary,
  ) => Record<keyof SiteProps, boolean>,
): TotalPropsFilter<SiteProps, SitePropsSummary> => {
  const filterProps = (
    totalProps: SiteProps,
    clientProps: SitePropsSummary,
  ) => {
    const predicate = getPredicate(totalProps, clientProps)

    return filterByKey(totalProps, predicate)
  }

  return filterProps
}
