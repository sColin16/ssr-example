export type ClientPropsManager<SiteProps> = {
  readCurrentProps: () => SiteProps
  updateProps: (updatedProps: Partial<SiteProps>) => void
  registerSubscription: (callback: SubscriptionCallback<SiteProps>) => void
}

export type SubscriptionCallback<SiteProps> = (
  message: Partial<SiteProps>,
) => void
