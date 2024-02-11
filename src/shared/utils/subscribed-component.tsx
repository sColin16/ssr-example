import { SiteProps } from "shared/components/AppBody"
import { buildManagedComponent } from "./managed-component"
import { useSubscribedProps } from "shared/hooks/use-subscribed-props"

export type SubscribedComponentOptions<K extends keyof SiteProps> = {
  key: K
  Component: (props: SiteProps[K]) => JSX.Element
}

/**
 * Builds a managed component whose props are derived directly from a given key
 * in the SiteProps object
 */
export function buildSubscribedComponent<K extends keyof SiteProps>({
  key,
  Component,
}: SubscribedComponentOptions<K>) {
  const useProps = () => {
    return useSubscribedProps(key)
  }

  const SubscribedComponent = buildManagedComponent({
    Component,
    useProps,
  })

  return SubscribedComponent
}
