import { SiteProps } from "example/shared/components/App"
import { DefaultClientPropsService } from "library/shared/service/clientProps"
import { filterPropsFromPredicate } from "library/shared/utils/filter-props"

export type SitePropsSummary = {
  color: string
  initialValue: number
}

export const summarizeSiteProps = (totalProps: SiteProps): SitePropsSummary => {
  return {
    color: totalProps.layout.backgroundColor,
    initialValue: totalProps.page.initialCounterValue,
  }
}

export const exampleFilterProps = filterPropsFromPredicate(
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

export const exampleClientPropsService = new DefaultClientPropsService(
  summarizeSiteProps,
)
