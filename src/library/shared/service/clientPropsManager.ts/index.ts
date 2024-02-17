import { ClientPropsManager, SubscriptionCallback } from "./types"

export class DefaultClientPropsManager<SiteProps>
  implements ClientPropsManager<SiteProps>
{
  private currentProps: SiteProps
  private readonly subscriptions: Array<SubscriptionCallback<SiteProps>> = []

  constructor(initialProps: SiteProps) {
    this.currentProps = initialProps
  }

  readCurrentProps = () => this.currentProps

  registerSubscription = (callback: SubscriptionCallback<SiteProps>) => {
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
