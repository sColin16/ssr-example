import { SiteProps } from "shared/components/AppBody"
import { useAggregateSubscribedProps } from "./use-aggregate-subsribed-props"

export const useSubscribedProps = <K extends keyof SiteProps>(
  key: K,
): SiteProps[K] => {
  return useAggregateSubscribedProps([key], (props) => props[key])
}
