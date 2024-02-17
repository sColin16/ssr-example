import { useEffect, useMemo, useState } from "react"
import { isNotNil, pickFields } from "library/shared/utils"
import { ClientPropsManager } from "library/shared/service/clientPropsManager.ts/types"

export type UseAggregateSubscribedPropsOptions<SiteProps extends object> = {
  useClientPropsManager: () => ClientPropsManager<SiteProps>
}

export type UseAggregateSubscribedProps<SiteProps> = <
  K extends keyof SiteProps,
  T,
>(
  keys: Array<K>,
  aggregator: (props: Pick<SiteProps, K>) => T,
) => T

export const buildUseAggregateSubscribedProps = <SiteProps extends object>({
  useClientPropsManager,
}: UseAggregateSubscribedPropsOptions<SiteProps>) => {
  const useAggregateSubscribedProps: UseAggregateSubscribedProps<SiteProps> = (
    keys,
    aggregator,
  ) => {
    const clientPropsManager = useClientPropsManager()

    const initialProps = useMemo(() => {
      return aggregator(pickFields(clientPropsManager.readCurrentProps(), keys))
    }, [aggregator, clientPropsManager, keys])

    const [props, setProps] = useState(initialProps)

    useEffect(() => {
      clientPropsManager.registerSubscription((updatedProps) => {
        const updatedSubscribedProps = pickFields(updatedProps, keys)

        if (Object.values(updatedSubscribedProps).some(isNotNil)) {
          const newSubscribedProps = pickFields(
            clientPropsManager.readCurrentProps(),
            keys,
          )
          const newAggregateProps = aggregator(newSubscribedProps)

          setProps(newAggregateProps)
        }
      })
    }, [clientPropsManager, keys, aggregator, setProps])

    return props
  }

  return useAggregateSubscribedProps
}
