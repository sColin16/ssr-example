import { SiteProps } from "shared/components/AppBody"

export type SitePropsSummary = {
  color: string
  initialValue: number
}

export const resolvePartialProps = (
  totalProps: SiteProps,
  clientProps: SitePropsSummary,
): Partial<SiteProps> => {
  const colorMatches = totalProps.layout.backgroundColor === clientProps.color
  const numMatches =
    totalProps.page.initialCounterValue === clientProps.initialValue

  const includeProp = {
    layout: !colorMatches,
    page: !numMatches,
  }

  return filterObject(totalProps, includeProp)
}

export const summarizeSiteProps = (totalProps: SiteProps): SitePropsSummary => {
  return {
    color: totalProps.layout.backgroundColor,
    initialValue: totalProps.page.initialCounterValue,
  }
}

const filterObject = <T>(
  input: T,
  filterKey: Record<keyof T, boolean>,
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(filterKey)
      .filter(([key, include]) => include)
      .map(([key]) => [key, input[key as keyof T]]),
  ) as Partial<T>
}
