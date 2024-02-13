import { Layout } from "./Layout"
import { Page } from "./Page"
import { Head } from "./Head"
import { buildSubscribedComponent } from "shared/utils/subscribed-component"
import { buildAggregateSubscribedComponent } from "shared/utils/aggregate-subscribed-component"

export const HeadManager = buildAggregateSubscribedComponent({
  keys: ["layout", "page"],
  aggregator: ({ layout, page }) => {
    return {
      title: `${layout.backgroundColor} - ${page.initialCounterValue}`,
    }
  },
  Component: Head,
})

export const LayoutManager = buildSubscribedComponent({
  key: "layout",
  Component: Layout,
})

export const PageManager = buildSubscribedComponent({
  key: "page",
  Component: Page,
})
