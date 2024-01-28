import { PropsWithChildren } from "react"
import { useNavigate } from "shared/hooks/use-navigate"

export type LinkProps = PropsWithChildren<{
  path: string
}>

export const Link = ({ path, children }: LinkProps) => {
  const navigate = useNavigate()

  return (
    <a
      href={path}
      onClick = {(e) => {
        e.preventDefault()
        navigate(path)
      }}
    >
      {children}
    </a>
  )
}
