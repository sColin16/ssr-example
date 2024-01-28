import { useEffect, useState } from 'react'
import { Link } from './Link'

export type CounterProps = {
  initialValue: number
}

export const Counter = ({ initialValue }: CounterProps) => {
  const [counter, setCounter] = useState(initialValue)

  useEffect(() => {
    setCounter(initialValue)
  }, [initialValue])

  return (
    <div>
      <h1>Counter at: {counter}</h1>
      <button onClick={() => setCounter(curr => curr - 1)}>
        Decrement
      </button>
      <button onClick={() => setCounter(curr => curr + 1)}>
        Increment
      </button>

      <br/>

      <Link path={'/zero'}>
        Zero
      </Link>
      <Link path={'/hundred'}>
        One hundred
      </Link>
      <Link path={'/thousand'}>
        One thousand
      </Link>
    </div>
  )
}
