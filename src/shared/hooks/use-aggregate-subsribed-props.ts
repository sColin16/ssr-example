import { SiteProps } from "shared/components/AppBody"
import { useClientPropsManager } from "./use-client-props-manager"
import { useEffect, useMemo, useState } from "react"
import { isNotNil, pickFields } from "shared/utils"

export const useAggregateSubscribedProps = <K extends keyof SiteProps, T>(
  keys: Array<K>,
  aggregator: (props: Pick<SiteProps, K>) => T,
) => {
  const clientPropsManager = useClientPropsManager()

  const initialProps = useMemo(() => {
    return aggregator(pickFields(clientPropsManager.currentProps, keys))
  }, [aggregator, clientPropsManager, keys])

  const [props, setProps] = useState(initialProps)

  useEffect(() => {
    clientPropsManager.registerSubscription((updatedProps) => {
      const updatedSubscribedProps = pickFields(updatedProps, keys)

      if (Object.values(updatedSubscribedProps).some(isNotNil)) {
        const newSubscribedProps = pickFields(clientPropsManager.currentProps, keys)
        const newAggregateProps = aggregator(newSubscribedProps)

        setProps(newAggregateProps)
      }
    })
  }, [clientPropsManager, keys, aggregator, setProps])

  return props
}
