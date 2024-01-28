import { Dispatch, SetStateAction } from "react"

export const isNull = <T>(value: T | null): value is null => value === null

export const isNotNull = <T>(value: T | null): value is T => !isNull(value)

export const requireOrThrow = <T>(value: T | null, error: unknown) => {
  if (isNull(value)) {
    throw error
  }

  return value
}

export type StatePair<T> = [T, Dispatch<SetStateAction<T>>]
