import { SiteProps } from "shared/components/AppBody"
import { useAggregateSubscribedProps } from "shared/hooks/use-aggregate-subsribed-props"
import { buildManagedComponent } from "./managed-component"

export type BuildAggregateSubscribedComponentOptions<
  K extends keyof SiteProps,
  T,
> = {
  keys: Array<K>
  aggregator: (props: Pick<SiteProps, K>) => T
  Component: (props: T) => JSX.Element
}

/**
 * Builds a managed component whose props are derived by aggregating multiple
 * keys from the SiteProps object
 */
export function buildAggregateSubscribedComponent<
  K extends keyof SiteProps,
  T,
>({
  keys,
  aggregator,
  Component,
}: BuildAggregateSubscribedComponentOptions<K, T>) {
  const useProps = () => {
    return useAggregateSubscribedProps(keys, aggregator)
  }

  const SubscribedComponent = buildManagedComponent({
    Component,
    useProps,
  })

  return SubscribedComponent
}
