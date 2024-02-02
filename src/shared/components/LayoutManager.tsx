import { PropsWithChildren } from "react"
import { useLayoutProps } from "shared/hooks/use-layout-props"
import { Layout } from "./Layout"

export type LayoutManagerProps = PropsWithChildren<{}>

export const LayoutManager = ({ children }: LayoutManagerProps) => {
  const [layoutProps] = useLayoutProps()

  return (
    <Layout {...layoutProps}>
      {children}
    </Layout>
  )
}
