import { ClientPropsManager } from "library/shared/service/clientPropsManager/types"
import { getUseNonNullContext } from "library/shared/utils/use-non-null-context"

export const buildUseClientPropsManager = <SiteProps>(
  clientPropsManagerContext: React.Context<ClientPropsManager<SiteProps> | null>,
) => {
  const useClientPropsManager = getUseNonNullContext(
    clientPropsManagerContext,
    "Client Props Manager",
  )

  return useClientPropsManager
}
