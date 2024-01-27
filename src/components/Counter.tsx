import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AppProps } from './App'

export type CounterProps = {
  initialValue: number
  setProps: Dispatch<SetStateAction<AppProps>>
}

export const Counter = ({ initialValue, setProps }: CounterProps) => {
  const [counter, setCounter] = useState(initialValue)

  console.log("From Counter", setProps)

  const handleNavigate = async () => {
    const response = await fetch('/api/props/hundred')
    const props = await response.json() as AppProps
    console.log(props)
    console.log("Before setting", setProps)
    setProps(props)
  }

  return (
    <div>
      <h1>Counter at: {counter}</h1>
      <button onClick={() => setCounter(curr => curr + 1)}>
        Increment
      </button>
      <button onClick={handleNavigate}>
        Navigate to /hundred
      </button>
    </div>
  )
}
