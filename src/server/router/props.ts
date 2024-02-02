import { Router } from "express"
import { PartialPropsResolver } from "server/service/props"

export type PropsRouterOptions = {
  baseUrl?: string
  resolvePartialProps: PartialPropsResolver
}

const DEFAULT_BASE_URL = "/api/props"

export const buildPropsRouter = ({
  resolvePartialProps,
  baseUrl = DEFAULT_BASE_URL,
}: PropsRouterOptions) => {
  const router = Router()

  router.get(`${baseUrl}*`, async (req, res) => {
    // Remove the base URL prefix
    const pagePath = req.url.slice(baseUrl.length)
    req.url = pagePath

    const props = await resolvePartialProps(req)

    res.status(200).json(props)
  })

  return router
}

export default buildPropsRouter
