export type ClientRouter = {
  replace: (path: string) => Promise<void>
  push: (path: string) => Promise<void>
  forward: () => void
  back: () => void
  go: (delta?: number) => void
}
