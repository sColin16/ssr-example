import { PropsWithChildren } from "react"
import { UseRouter } from "../hooks/use-router"

export type LinkOptions = {
  useRouter: UseRouter
}
export type LinkProps = PropsWithChildren<{
  path: string
}>

export const buildLink = ({ useRouter }: LinkOptions) => {
  const Link = ({ path, children }: LinkProps) => {
    const router = useRouter()

    return (
      <a
        href={path}
        onClick={(e) => {
          e.preventDefault()
          router.push(path)
        }}
      >
        {children}
      </a>
    )
  }

  return Link
}
