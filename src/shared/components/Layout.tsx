import { PropsWithChildren } from "react"

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
