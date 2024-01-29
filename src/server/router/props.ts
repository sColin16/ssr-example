import { Router, Request } from "express"
import { AppProps } from "shared/components/App"

export type PropsRouterOptions = {
  baseUrl?: string
  resolveProps: (req: Request) => Promise<AppProps>
}

const DEFAULT_BASE_URL = "/api/props"

export const propsRouter = ({
  resolveProps,
  baseUrl = DEFAULT_BASE_URL,
}: PropsRouterOptions) => {
  const router = Router()

  router.get(`${baseUrl}*`, async (req, res) => {
    // Remove the base URL prefix
    const pagePath = req.url.slice(baseUrl.length)
    req.url = pagePath

    const props = await resolveProps(req)

    res.status(200).json(props)
  })

  return router
}

export default propsRouter
