import { buildManagedComponent } from "./managed-component"
import { UseAggregateSubscribedProps } from "library/shared/hooks/use-aggregate-subsribed-props"

export type BuildAggregateSubscribedComponentOptions<
  SiteProps,
  K extends keyof SiteProps,
  T,
> = {
  useAggregateSubscribedProps: UseAggregateSubscribedProps<SiteProps>
  keys: Array<K>
  aggregator: (props: Pick<SiteProps, K>) => T
  Component: (props: T) => JSX.Element
}

/**
 * Builds a managed component whose props are derived by aggregating multiple
 * keys from the SiteProps object
 */
export function buildAggregateSubscribedComponent<
  SiteProps,
  K extends keyof SiteProps,
  T,
>({
  useAggregateSubscribedProps,
  keys,
  aggregator,
  Component,
}: BuildAggregateSubscribedComponentOptions<SiteProps, K, T>) {
  const useProps = () => {
    return useAggregateSubscribedProps(keys, aggregator)
  }

  const SubscribedComponent = buildManagedComponent({
    Component,
    useProps,
  })

  return SubscribedComponent
}
