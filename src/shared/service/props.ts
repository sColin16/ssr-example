import { AppProps } from "shared/components/App"

export const propsService = {
  fetchProps: async (path: string): Promise<AppProps> => {
    const response = await fetch(`/api/props${path}`)
    const props = (await response.json()) as AppProps

    return props
  },
}
