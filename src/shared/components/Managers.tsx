import { Layout } from "./Layout"
import { Page } from "./Page"
import { Head } from "./Head"
import { buildSubscribedComponent } from "shared/utils/subscribed-component"

export const HeadManager = buildSubscribedComponent({
  key: "head",
  Component: Head,
})

export const LayoutManager = buildSubscribedComponent({
  key: 'layout',
  Component: Layout,
})

export const PageManager = buildSubscribedComponent({
  key: 'page',
  Component: Page,
})
