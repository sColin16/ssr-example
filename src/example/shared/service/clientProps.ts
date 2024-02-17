import { SiteProps } from "example/shared/components/App";
import { DefaultClientPropsService } from "library/shared/service/clientProps";

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
