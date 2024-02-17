import { useContext } from "react"
import { requireOrThrow } from "."

export const getUseNonNullContext = <ContextType>(
  context: React.Context<ContextType | null>,
  name: string,
) => {
  const useNonNullContext = () => {
    const contextValue = useContext(context)

    return requireOrThrow(
      contextValue,
      new Error(`Error accessing context "${name}"`),
    )
  }

  return useNonNullContext
}
