import { propsService } from "shared/service/props"
import { useProps } from "./use-props"
import { useCallback } from "react"

export const useNavigate = () => {
  const [, setProps] = useProps()

  const navigate = useCallback(
    async (path: string) => {
      const newProps = await propsService.fetchProps(path)

      setProps(newProps)

      history.pushState(newProps, "", path)
    },
    [setProps],
  )

  return navigate
}
