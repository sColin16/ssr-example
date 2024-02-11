import { PropsWithChildren } from "react"
import { SiteProps } from "shared/components/AppBody"
import { useAggregateSubscribedProps } from "shared/hooks/use-aggregate-subsribed-props"

export type ManagedComponentOptions<Props> = {
  Component: (props: Props) => JSX.Element
  useProps: () => Props
}

/**
 * Composes a component with a hook that gets props for that component, to
 * produce a component that doesn't require any props (but can be passed
 * children)
 */
export function buildManagedComponent<Props>({
  Component,
  useProps,
}: ManagedComponentOptions<Props>) {
  const ManagedComponent = ({ children }: PropsWithChildren) => {
    const props = useProps()

    return <Component {...props}>{children}</Component>
  }

  return ManagedComponent
}
