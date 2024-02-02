import { Request } from "express"
import { AppProps } from "shared/components/App"
import { PartialAppProps } from "shared/service/props"

export type PropsResolver = (req: Request) => Promise<AppProps>
export type PartialPropsResolver = (req: Request) => Promise<PartialAppProps>

export const resolveProps: PropsResolver = async (req) => {
  const [color, numberStr] = req.url.split("/").slice(1, 3)

  const number = Number(numberStr)

  return {
    layout: {
      backgroundColor: color
    },
    page: {
      initialCounterValue: number
    }
  }
}

export const resolvePartialProps: PartialPropsResolver = async (req) => {
  // TODO: probably make this a configurable function and build this function
  const totalProps = await resolveProps(req)
  // TODO: do some error handling here?
  const clientProps = JSON.parse(req.headers['x-client-props'] as string) as AppProps

  const layoutProps = clientProps.layout.backgroundColor === totalProps.layout.backgroundColor ? undefined : totalProps.layout
  const pageProps = clientProps.page.initialCounterValue === totalProps.page.initialCounterValue ? undefined : totalProps.page

  return {
    layout: layoutProps,
    page: pageProps
  }
}
