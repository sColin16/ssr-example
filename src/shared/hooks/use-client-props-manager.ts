import { ClientPropsManagerContext } from "shared/contexts/propsManager"
import { getUseNonNullContext } from "shared/utils/use-non-null-context"

export const useClientPropsManager = getUseNonNullContext(ClientPropsManagerContext, "Client Props Manager")
