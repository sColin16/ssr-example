import { SiteProps } from "shared/components/AppBody"

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
