import { Request } from "express"
import { AppProps } from "shared/components/App"

export type PropsResolver = (req: Request) => Promise<AppProps>

export const resolveProps: PropsResolver = async (req) => {
  const page = req.url.split("/").at(1)

  if (page === "hundred") {
    return {
      initialValue: 100,
    }
  } else if (page === "thousand") {
    return {
      initialValue: 1000,
    }
  }

  return {
    initialValue: 0,
  }
}
