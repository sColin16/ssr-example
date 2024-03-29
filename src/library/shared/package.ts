import { buildLink } from "library/shared/components/Link"
import { buildClientPropsManagerContext } from "library/shared/contexts/propsManager"
import { buildUseAggregateSubscribedProps } from "library/shared/hooks/use-aggregate-subsribed-props"
import { buildUseClientPropsManager } from "library/shared/hooks/use-client-props-manager"
import { buildUseSubscribedProps } from "library/shared/hooks/use-subscribed-props"
import { ClientPropsService } from "library/shared/service/clientProps/types"
import { BuildAggregateSubscribedComponentOptions } from "library/shared/utils/aggregate-subscribed-component"
import { SubscribedComponentOptions } from "library/shared/utils/subscribed-component"
import { buildSubscribedComponent as buildSubscribedComponentGeneric } from "library/shared/utils/subscribed-component"
import { buildAggregateSubscribedComponent as buildAggregateSubscribedComponentGeneric } from "library/shared/utils/aggregate-subscribed-component"
import { buildHistoryManagerContext } from "./contexts/historyManager"
import { buildUseHistoryManager } from "./hooks/use-history-manager"
import { buildClientProvider } from "./components/ClientProvider"
import { buildUseRouter } from "./hooks/use-router"

export const buildSharedPackage = <SiteProps extends object>(
  clientPropsService: ClientPropsService<SiteProps>,
) => {
  const ClientPropsManagerContext = buildClientPropsManagerContext<SiteProps>()
  const HistoryManagerContext = buildHistoryManagerContext<SiteProps>()
  const ClientProvider = buildClientProvider(
    ClientPropsManagerContext.Provider,
    HistoryManagerContext.Provider,
  )
  const useClientPropsManager = buildUseClientPropsManager(
    ClientPropsManagerContext,
  )
  const useHistoryManager = buildUseHistoryManager(HistoryManagerContext)
  const useRouter = buildUseRouter({ clientPropsService, useClientPropsManager, useHistoryManager })
  const Link = buildLink({ useRouter })
  const useSubscribedProps = buildUseSubscribedProps({ useClientPropsManager })
  const useAggregateSubscribedProps = buildUseAggregateSubscribedProps({
    useClientPropsManager,
  })
  const buildSubscribedComponent = <K extends keyof SiteProps>(
    input: Omit<SubscribedComponentOptions<SiteProps, K>, "useSubscribedProps">,
  ) =>
    buildSubscribedComponentGeneric<SiteProps, K>({
      useSubscribedProps,
      ...input,
    })
  const buildAggregateSubscribedComponent = <K extends keyof SiteProps, T>(
    input: Omit<
      BuildAggregateSubscribedComponentOptions<SiteProps, K, T>,
      "useAggregateSubscribedProps"
    >,
  ) =>
    buildAggregateSubscribedComponentGeneric({
      useAggregateSubscribedProps,
      ...input,
    })

  return {
    ClientProvider,
    Link,
    useRouter,
    buildSubscribedComponent,
    buildAggregateSubscribedComponent,
  }
}
