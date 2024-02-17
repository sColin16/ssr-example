import { ClientPropsManager } from "../clientPropsManager/types"
import { HistoryManager } from "./types"

export class DefaultHistoryManager<SiteProps, HistoryState>
  implements HistoryManager<SiteProps>
{
  constructor(
    private readonly clientPropsManager: ClientPropsManager<SiteProps>,
    private readonly propsToHistoryState: (props: SiteProps) => HistoryState,
    private readonly handlePopState: (
      clientPropsManager: ClientPropsManager<SiteProps>,
      event: PopStateEvent,
    ) => void,
  ) {}

  initialize = () => {
    const initialState = this.propsToHistoryState(
      this.clientPropsManager.readCurrentProps(),
    )

    // Set the initial state so that users can navigate back to initial render
    history.replaceState(initialState, "", document.location.href)

    // Listen to browser navigation events and update props accordingly
    addEventListener("popstate", (event) =>
      this.handlePopState(this.clientPropsManager, event),
    )
  }

  replaceState = (path: string, props: SiteProps) => {
    history.replaceState(this.propsToHistoryState(props), "", path)
  }

  pushState = (path: string, props: SiteProps) => {
    history.pushState(this.propsToHistoryState(props), "", path)
  }

  forward = () => {
    history.forward()
  }

  back = () => {
    history.back()
  }

  go = (delta?: number) => {
    history.go(delta)
  }
}

export class BasicHistoryManager<SiteProps, HistoryState>
  implements HistoryManager<SiteProps>
{
  private readonly defaultHistoryManager: DefaultHistoryManager<
    SiteProps,
    HistoryState
  >

  constructor(
    clientPropsManager: ClientPropsManager<SiteProps>,
    propsToHistoryState: (props: SiteProps) => HistoryState,
    resolveUpdatedProps: (
      currentProps: SiteProps,
      state: HistoryState,
    ) => Partial<SiteProps>,
  ) {
    this.defaultHistoryManager = new DefaultHistoryManager(
      clientPropsManager,
      propsToHistoryState,
      (
        clientPropsManager: ClientPropsManager<SiteProps>,
        event: PopStateEvent,
      ) => basicHandlePopState(resolveUpdatedProps, clientPropsManager, event),
    )
  }

  initialize = () => {
    this.defaultHistoryManager.initialize()
  }

  replaceState = (path: string, props: SiteProps) => {
    this.defaultHistoryManager.replaceState(path, props)
  }

  pushState = (path: string, props: SiteProps) => {
    this.defaultHistoryManager.pushState(path, props)
  }

  forward = () => {
    this.defaultHistoryManager.forward()
  }

  back = () => {
    this.defaultHistoryManager.back()
  }

  go = (delta?: number) => {
    this.defaultHistoryManager.go(delta)
  }
}

export class StarterHistoryManager<SiteProps>
  implements HistoryManager<SiteProps>
{
  private readonly basicHistoryManager: BasicHistoryManager<
    SiteProps,
    SiteProps
  >

  constructor(clientPropsManager: ClientPropsManager<SiteProps>) {
    this.basicHistoryManager = new BasicHistoryManager(
      clientPropsManager,
      (props) => props,
      (currentProps, state) => state,
    )
  }

  initialize = () => {
    this.basicHistoryManager.initialize()
  }

  replaceState = (path: string, props: SiteProps) => {
    this.basicHistoryManager.replaceState(path, props)
  }

  pushState = (path: string, props: SiteProps) => {
    this.basicHistoryManager.pushState(path, props)
  }

  forward = () => {
    this.basicHistoryManager.forward()
  }

  back = () => {
    this.basicHistoryManager.back()
  }

  go = (delta?: number) => {
    this.basicHistoryManager.go(delta)
  }
}

export const basicHandlePopState = <SiteProps, HistoryState>(
  resolveUpdatedProps: (
    currentProps: SiteProps,
    state: HistoryState,
  ) => Partial<SiteProps>,
  clientPropsManager: ClientPropsManager<SiteProps>,
  event: PopStateEvent,
) => {
  const state = event.state as HistoryState
  const updatedProps = resolveUpdatedProps(
    clientPropsManager.readCurrentProps(),
    state,
  )

  clientPropsManager.updateProps(updatedProps)
}
