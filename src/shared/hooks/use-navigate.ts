import { propsService } from "shared/service/props"
import { useProps } from "./use-props"
import { useCallback } from "react"


export const useNavigate = () => {
  const [, setProps] = useProps()

  const navigate = useCallback(async (path: string) => {
    const props = await propsService.fetchProps(path)

    setProps(props)

    history.pushState(null, "", path)
  }, [setProps])

  return navigate
}
