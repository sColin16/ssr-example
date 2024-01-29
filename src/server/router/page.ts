import { Router, Request } from "express"

export type PageRouterOptions = {
  renderPage: (req: Request) => Promise<string>
}

export const buildPageRouter = ({ renderPage }: PageRouterOptions) => {
  const router = Router()

  router.get("*", async (req, res) => {
    const pageString = await renderPage(req)

    res.send(pageString)
  })

  return router
}

export default buildPageRouter
