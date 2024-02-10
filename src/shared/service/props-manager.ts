import { LayerProps } from "shared/components/App"

export type PropsUpdateMessage = {
  updatedProps: Partial<LayerProps>
  allProps: LayerProps
  state: PropsUpdateState
}

export type PropsUpdateRequest = {
  updatedProps: Partial<LayerProps>
  state: PropsUpdateState // A passed through piece of information, currently for navigation manager
}

export type PropsUpdateState = PathNavigateState | ForwardBackState

type PathNavigateState = {
  type: 'pathNavigate'
  path: string
}

type ForwardBackState = {
  type: 'forwardBack'
}

export type SubscriptionCallback = (message: PropsUpdateMessage) => void

export class ClientPropsManager {
  currentProps: LayerProps
  private readonly subscriptions: Array<SubscriptionCallback> = []

  constructor(initialProps: LayerProps) {
    this.currentProps = initialProps
  }

  registerSubscription = (callback: SubscriptionCallback) => {
    this.subscriptions.push(callback)
  }

  updateProps = (request: PropsUpdateRequest) => {
    this.currentProps = { ...this.currentProps, ...request.updatedProps }

    this.notifySubscribers(this.currentProps, request.state)
  }

  private notifySubscribers = (updatedProps: Partial<LayerProps>, state: PropsUpdateState) => {
    this.subscriptions.forEach(subscriberCallback => subscriberCallback({
      allProps: this.currentProps,
      updatedProps,
      state
    }))
  }
}
