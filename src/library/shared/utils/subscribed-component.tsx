import { buildManagedComponent } from "./managed-component"
import { UseSubscribedProps } from "library/shared/hooks/use-subscribed-props"

export type SubscribedComponentOptions<SiteProps, K extends keyof SiteProps> = {
  useSubscribedProps: UseSubscribedProps<SiteProps>
  key: K
  Component: (props: SiteProps[K]) => JSX.Element
}

/**
 * Builds a managed component whose props are derived directly from a given key
 * in the SiteProps object
 */
export function buildSubscribedComponent<SiteProps, K extends keyof SiteProps>({
  useSubscribedProps,
  key,
  Component,
}: SubscribedComponentOptions<SiteProps, K>) {
  const useProps = () => {
    return useSubscribedProps(key)
  }

  const SubscribedComponent = buildManagedComponent({
    Component,
    useProps,
  })

  return SubscribedComponent
}
