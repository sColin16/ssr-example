export type ClientPropsManager<SiteProps> = {
  readCurrentProps: () => SiteProps
  updateProps: (updatedProps: Partial<SiteProps>) => SiteProps
  registerSubscription: (callback: SubscriptionCallback<SiteProps>) => void
}

export type SubscriptionCallback<SiteProps> = (
  message: Partial<SiteProps>,
) => void
