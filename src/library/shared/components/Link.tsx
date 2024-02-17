import { PropsWithChildren } from "react"
import { UseNavigate, buildUseNavigate } from "library/shared/hooks/use-navigate"

export type LinkOptions = {
  useNavigate: UseNavigate
}
export type LinkProps = PropsWithChildren<{
  path: string
}>

export const buildLink = ({ useNavigate }: LinkOptions) => {
  const Link = ({ path, children }: LinkProps) => {
    const navigate = useNavigate()

    return (
      <a
        href={path}
        onClick={(e) => {
          e.preventDefault()
          navigate(path)
        }}
      >
        {children}
      </a>
    )
  }

  return Link
}
