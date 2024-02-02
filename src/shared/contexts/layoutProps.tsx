import { PropsWithChildren, createContext, useState } from "react"
import { LayoutProps } from "shared/components/Layout"
import { useEventListener } from "shared/hooks/use-event-listener"
import { StatePair } from "shared/utils"

export type LayoutPropsProviderProps = PropsWithChildren<{
  initialProps: LayoutProps
}>

export const LayoutPropsContext = createContext<StatePair<LayoutProps> | null>(
  null,
)

export const LayoutPropsProvider = ({
  initialProps,
  children,
}: LayoutPropsProviderProps) => {
  const [props, setProps] = useState(initialProps)

  useEventListener("popstate", (event) => {
    // TODO: only set this when the layout changes as a result of navigation
    setProps(event.state.layout)
  })

  return (
    <LayoutPropsContext.Provider value={[props, setProps]}>
      {children}
    </LayoutPropsContext.Provider>
  )
}
