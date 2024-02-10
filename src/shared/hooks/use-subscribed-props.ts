import { SiteProps } from "shared/components/App"
import { useClientPropsManager } from "./use-client-props-manager"
import { useEffect, useState } from "react"
import { isNotNil } from "shared/utils"

export const useSubscribedProps = <K extends keyof SiteProps>(key: K) => {
  const clientPropsManager = useClientPropsManager()
  const [props, setProps] = useState(clientPropsManager.currentProps[key])

  useEffect(() => {
    clientPropsManager.registerSubscription((updatedProps) => {
      const subscribedProps = updatedProps[key] as SiteProps[K] | undefined

      if (isNotNil(subscribedProps))  {
        setProps(subscribedProps)
      }
    })
  }, [clientPropsManager, key, setProps])

  return props
}
