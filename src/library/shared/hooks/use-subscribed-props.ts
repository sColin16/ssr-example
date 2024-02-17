import { buildUseAggregateSubscribedProps } from "./use-aggregate-subsribed-props"
import { ClientPropsManager } from "library/shared/service/clientPropsManager/types"

export type UseSubscribedPropsOptions<SiteProps extends object> = {
  useClientPropsManager: () => ClientPropsManager<SiteProps>
}

export type UseSubscribedProps<SiteProps> = <K extends keyof SiteProps>(
  key: K,
) => SiteProps[K]

export const buildUseSubscribedProps = <SiteProps extends object>({
  useClientPropsManager,
}: UseSubscribedPropsOptions<SiteProps>) => {
  const useAggregateSubscribedProps = buildUseAggregateSubscribedProps({
    useClientPropsManager,
  })

  const useSubscribedProps: UseSubscribedProps<SiteProps> = (key) => {
    return useAggregateSubscribedProps([key], (props) => props[key])
  }

  return useSubscribedProps
}
