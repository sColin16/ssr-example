import { HistoryManager } from "../service/historyManager/types"
import { getUseNonNullContext } from "../utils/use-non-null-context"

export const buildUseHistoryManager = <SiteProps>(
  historyManagerContext: React.Context<HistoryManager<SiteProps> | null>,
) => {
  const useHistoryManager = getUseNonNullContext(
    historyManagerContext,
    "History Manager",
  )

  return useHistoryManager
}
