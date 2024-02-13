import { SiteProps } from "shared/components/AppBody"

export type SubscriptionCallback = (message: Partial<SiteProps>) => void

export class ClientPropsManager {
  currentProps: SiteProps
  private readonly subscriptions: Array<SubscriptionCallback> = []

  constructor(initialProps: SiteProps) {
    this.currentProps = initialProps
  }

  registerSubscription = (callback: SubscriptionCallback) => {
    this.subscriptions.push(callback)
  }

  updateProps = (updatedProps: Partial<SiteProps>) => {
    this.currentProps = { ...this.currentProps, ...updatedProps }

    this.notifySubscribers(updatedProps)
  }

  private notifySubscribers = (updatedProps: Partial<SiteProps>) => {
    this.subscriptions.forEach((subscriberCallback) =>
      subscriberCallback(updatedProps),
    )
  }
}
