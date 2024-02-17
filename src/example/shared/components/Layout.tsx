import { PropsWithChildren } from "react"
import { buildSubscribedComponent } from "../package"

export type LayoutProps = PropsWithChildren<{
  backgroundColor: string
}>

export const Layout = ({ backgroundColor, children }: LayoutProps) => {
  console.log("Rendering the layout")

  return (
    <div
      style={{
        backgroundColor,
      }}
    >
      {children}
    </div>
  )
}

export const ManagedLayout = buildSubscribedComponent({
  key: 'layout',
  Component: Layout
})
