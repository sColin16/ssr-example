import { SiteProps } from "shared/components/AppBody";
import { DefaultClientPropsService } from ".";

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

export const exampleClientPropsService = new DefaultClientPropsService(summarizeSiteProps)
