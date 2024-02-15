import { Dispatch, SetStateAction } from "react"
import { Request } from "express"

export const isNil = <T>(
  value: T | null | undefined,
): value is null | undefined => value == null

export const isNotNil = <T>(value: T | null | undefined): value is T =>
  !isNil(value)

export const requireOrThrow = <T>(
  value: T | null | undefined,
  error: unknown,
) => {
  if (isNil(value)) {
    throw error
  }

  return value
}

export const pickFields = <T extends object, K extends keyof T>(
  obj: T,
  keys: Array<K>,
): Pick<T, K> => {
  const picked: Partial<Pick<T, K>> = {}

  keys.forEach((key) => (picked[key] = obj[key]))

  return picked as Pick<T, K>
}

export const filterByKey = <T extends object>(
  input: T,
  predicate: Record<keyof T, boolean>,
): Partial<T> => {
  const includedKeys = Object.entries(predicate)
    .filter(([key, include]) => include)
    .map(([key, include]) => key) as Array<keyof T>

  return pickFields(input, includedKeys)
}

export const parseRequestUrl = (
  req: Request,
  resolveProtocol: (req: Request) => string = defaultResolveRequestProtocol,
  resolveHost: (req: Request) => string = defaultResolveRequestHost,
): URL => {
  const protocol = resolveProtocol(req)
  const host = resolveHost(req)

  return new URL(req.url, `${protocol}://${host}`)
}

// We can probably determine this from headers or env variables
const defaultResolveRequestProtocol = (req: Request) => "https"

const defaultResolveRequestHost = (req: Request) => {
  return requireOrThrow(
    req.headers.host,
    new Error("Failed to resolve request host: host header was undefined"),
  )
}

export type StatePair<T> = [T, Dispatch<SetStateAction<T>>]
