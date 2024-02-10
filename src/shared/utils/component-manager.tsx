import { PropsWithChildren } from "react"

export type BuildComponentManagerOptions<Props> = {
  Component: (props: Props) => JSX.Element
  useProps: () => Props
}

export function buildComponentManager<Props>({
  Component,
  useProps,
}: BuildComponentManagerOptions<Props>) {
  const ComponentManager = ({ children }: PropsWithChildren) => {
    const props = useProps()

    return <Component {...props}>{children}</Component>
  }

  return ComponentManager
}
