import { buildComponentManager } from "shared/utils/component-manager"
import { Layout } from "./Layout"
import { Page } from "./Page"
import { useSubscribedProps } from "shared/hooks/use-subscribed-props"

const useLayoutProps = () => {
  return useSubscribedProps('layout')
}

const usePageProps = () => {
  return useSubscribedProps('page')
}

export const LayoutManager = buildComponentManager({
  useProps: useLayoutProps,
  Component: Layout,
})

export const PageManager = buildComponentManager({
  useProps: usePageProps,
  Component: Page
})
