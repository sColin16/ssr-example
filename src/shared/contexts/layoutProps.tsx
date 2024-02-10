import { PropsWithChildren, createContext, useEffect, useState } from "react"
import { LayoutProps } from "shared/components/Layout"
import { useClientPropsManager } from "shared/hooks/use-client-props-manager"
import { isNotNil } from "shared/utils"

export type LayoutPropsProviderProps = PropsWithChildren<{
  initialProps: LayoutProps
}>

export const LayoutPropsContext = createContext<LayoutProps | null>(null)

export const LayoutPropsProvider = ({
  initialProps,
  children,
}: LayoutPropsProviderProps) => {
  const [props, setProps] = useState(initialProps)
  const clientPropsManager = useClientPropsManager()

  // Register subscription to listen to updates to layout props
  useEffect(() => {
    clientPropsManager.registerSubscription((updatedProps) => {
      if (isNotNil(updatedProps.layout)) {
        setProps(updatedProps.layout)
      }
    })
  }, [clientPropsManager, setProps])

  return (
    <LayoutPropsContext.Provider value={props}>
      {children}
    </LayoutPropsContext.Provider>
  )
}
