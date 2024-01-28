import { PropsProvider } from "shared/contexts/props"
import { Entrypoint } from "./Entrypoint"

export type AppProps = {
  initialValue: number
}

export const App = (initialProps: AppProps) => {
  return (
    <PropsProvider initialProps={initialProps}>
      <Entrypoint />
    </PropsProvider>
  )
}
