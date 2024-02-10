import { PropsWithChildren, createContext, useEffect, useState } from "react"
import { PageProps } from "shared/components/Page"
import { useClientPropsManager } from "shared/hooks/use-client-props-manager"
import { isNotNil } from "shared/utils"

export type PagePropsProviderProps = PropsWithChildren<{
  initialProps: PageProps
}>

export const PagePropsContext = createContext<PageProps | null>(null)

export const PagePropsProvider = ({
  initialProps,
  children,
}: PagePropsProviderProps) => {
  const [props, setProps] = useState(initialProps)
  const clientPropsManager = useClientPropsManager()

  useEffect(() => {
    clientPropsManager.registerSubscription((updatedProps) => {
      if (isNotNil(updatedProps.page)) {
        setProps(updatedProps.page)
      }
    })
  }, [clientPropsManager, setProps])

  return (
    <PagePropsContext.Provider value={props}>
      {children}
    </PagePropsContext.Provider>
  )
}
