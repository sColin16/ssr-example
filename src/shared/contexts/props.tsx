import { PropsWithChildren, createContext, useState } from "react";
import { AppProps } from "shared/components/App"
import { StatePair } from "shared/utils";

export const PropsContext = createContext<StatePair<AppProps> | null>(null)

export type PropsProviderProps = PropsWithChildren<{
  initialProps: AppProps
}>

export const PropsProvider = ({ initialProps, children }: PropsProviderProps) => {
  const [props, setProps] = useState(initialProps)

  return (
    <PropsContext.Provider value={[props, setProps]}>
      {children}
    </PropsContext.Provider>
  )
}
