import { PropsWithChildren, createContext, useState } from "react"
import { PageProps } from "shared/components/Page"
import { useEventListener } from "shared/hooks/use-event-listener"
import { StatePair } from "shared/utils"

export type PagePropsProviderProps = PropsWithChildren<{
  initialProps: PageProps
}>

export const PagePropsContext = createContext<StatePair<PageProps> | null>(null)

export const PagePropsProvider = ({
  initialProps,
  children,
}: PagePropsProviderProps) => {
  const [props, setProps] = useState(initialProps)

  useEventListener("popstate", (event) => {
    // TODO: only set this when the page changes as a result of navigation
    setProps(event.state.page)
  })

  return (
    <PagePropsContext.Provider value={[props, setProps]}>
      {children}
    </PagePropsContext.Provider>
  )
}
