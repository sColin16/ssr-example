import { LayerProps } from "shared/components/App"

export type PartialAppProps = Partial<LayerProps>

export const propsService = {
  fetchProps: async (path: string, currProps: LayerProps): Promise<PartialAppProps> => {
    const response = await fetch(`/api/props${path}`, {
      headers: {
        // TODO: send some abbreviated version of the props instead of the entire props payload
        'X-Client-Props': JSON.stringify(currProps)
      }
    })
    const props = (await response.json()) as PartialAppProps

    return props
  },
}
