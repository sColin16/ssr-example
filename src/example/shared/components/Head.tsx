import { buildAggregateSubscribedComponent } from "../package"

export type HeadProps = {
  title: string
}

export const Head = ({ title }: HeadProps) => {
  console.log("Rendering Head Component")

  return <title>{title}</title>
}

export const ManagedHead = buildAggregateSubscribedComponent({
  keys: ["layout", "page"],
  aggregator: ({ layout, page }) => {
    return {
      title: `${layout.backgroundColor} - ${page.initialCounterValue}`,
    }
  },
  Component: Head,
})
