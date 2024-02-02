import { Router, Request } from "express"
import { PartialPropsResolver, PropsResolver, resolvePartialProps, resolveProps } from "./service/props"
import { Container } from "mesh-di"
import { buildRenderPage } from "./service/renderPage"
import buildPropsRouter from "./router/props"
import buildPageRouter from "./router/page"

type Catalog = {
  propsResolver: PropsResolver
  partialPropsResolver: PartialPropsResolver
  renderPage: (req: Request) => Promise<string>
  propsRouter: Router
  pageRouter: Router
}

const container = new Container<Catalog>()

container.registerStatic("propsResolver", resolveProps)
container.registerStatic("partialPropsResolver", resolvePartialProps)
container.register("renderPage", {
  deps: ["propsResolver"],
  func: ({ propsResolver }) => buildRenderPage({ resolveProps: propsResolver }),
})

container.register("propsRouter", {
  deps: ["partialPropsResolver"],
  func: ({ partialPropsResolver }) =>
    buildPropsRouter({ resolvePartialProps: partialPropsResolver }),
})

container.register("pageRouter", {
  deps: ["renderPage"],
  func: ({ renderPage }) => buildPageRouter({ renderPage }),
})

export const propsRouter = container.resolve("propsRouter")
export const pageRouter = container.resolve("pageRouter")
