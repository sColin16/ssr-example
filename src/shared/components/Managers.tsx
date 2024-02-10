import { buildComponentManager } from "shared/utils/component-manager"
import { Layout } from "./Layout"
import { Page } from "./Page"
import { useSubscribedProps } from "shared/hooks/use-subscribed-props"
import { Head } from "./Head"

const useHeadProps = () => {
  return useSubscribedProps('head')
}

const useLayoutProps = () => {
  return useSubscribedProps('layout')
}

const usePageProps = () => {
  return useSubscribedProps('page')
}

export const HeadManager = buildComponentManager({
  useProps: useHeadProps,
  Component: Head
})

export const LayoutManager = buildComponentManager({
  useProps: useLayoutProps,
  Component: Layout,
})

export const PageManager = buildComponentManager({
  useProps: usePageProps,
  Component: Page
})
