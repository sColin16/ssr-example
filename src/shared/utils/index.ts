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
const defaultResolveRequestProtocol = (req: Request) => 'https'

const defaultResolveRequestHost = (req: Request) => {
  return requireOrThrow(
    req.headers.host,
    new Error("Failed to resolve request host: host header was undefined"),
  )
}

export type StatePair<T> = [T, Dispatch<SetStateAction<T>>]
