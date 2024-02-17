import { createContext } from "react"
import { HistoryManager } from "../service/historyManager/types"

export function buildHistoryManagerContext<SiteProps>() {
  return createContext<HistoryManager<SiteProps> | null>(null)
}
