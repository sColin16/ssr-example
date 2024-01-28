import { AppProps } from "shared/components/App";
import { Request } from "express";

export const resolveProps = (req: Request): AppProps => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  const page = url.pathname.split('/').at(1)

  if (page === 'hundred') {
    return {
      initialValue: 100
    }
  } else if (page === 'thousand') {
    return {
      initialValue: 1000
    }
  }

  return {
    initialValue: 0
  }
}
