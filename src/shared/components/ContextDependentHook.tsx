export type ContextDependentHookProps = {
  useHook: () => void
}

/** Executes a hook that depends on being nested in a context */
export const ContextDependentHook = ({ useHook }: ContextDependentHookProps) => {
  useHook()

  return null
}
