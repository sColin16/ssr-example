export type HistoryManager<SiteProps> = {
  initialize: () => void
  replaceState: (path: string, props: SiteProps) => void
  pushState: (path: string, props: SiteProps) => void
  forward: () => void
  back: () => void
  go: (delta?: number) => void
}
