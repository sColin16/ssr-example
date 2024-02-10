import { LayerProps } from "shared/components/App"

export type SubscriptionCallback = (message: Partial<LayerProps>) => void

export class ClientPropsManager {
  currentProps: LayerProps
  private readonly subscriptions: Array<SubscriptionCallback> = []

  constructor(initialProps: LayerProps) {
    this.currentProps = initialProps
  }

  registerSubscription = (callback: SubscriptionCallback) => {
    this.subscriptions.push(callback)
  }

  updateProps = (updatedProps: Partial<LayerProps>) => {
    this.currentProps = { ...this.currentProps, ...updatedProps }

    this.notifySubscribers(updatedProps)
  }

  private notifySubscribers = (updatedProps: Partial<LayerProps>) => {
    this.subscriptions.forEach((subscriberCallback) =>
      subscriberCallback(updatedProps)
    )
  }
}
