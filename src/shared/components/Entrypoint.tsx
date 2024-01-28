import { useProps } from "shared/hooks/use-props"
import { Counter } from "./Counter"

export const Entrypoint = () => {
  const [props] = useProps()

  return (
    <Counter {...props} />
  )
}
