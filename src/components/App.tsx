import { useEffect, useState } from "react"

export type AppProps = {
  initialValue: number
}

export const App = (initialProps: AppProps) => {
  const [props, setProps] = useState(initialProps)
  const [counter, setCounter] = useState(props.initialValue)

  // Is there a way to avoid this effect? Maybe a hook to do this automatically
  useEffect(() => {
    setCounter(props.initialValue)
  }, [props.initialValue])

  const handleNavigate = async (path: string) => {
    const response = await fetch(`/api/props${path}`)
    const props = await response.json() as AppProps
    setProps(props)
    history.pushState(null, "", path)
  }

  return (
    <div>
      <h1>Counter at: {counter}</h1>
      <button onClick={() => setCounter(curr => curr + 1)}>
        Increment
      </button>
      <button onClick={() => handleNavigate('/hundred')}>
        One hundred
      </button>
      <button onClick={() => handleNavigate('/thousand')}>
        One thousand
      </button>
    </div>
  )
}
