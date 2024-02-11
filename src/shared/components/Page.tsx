import { Counter } from "./Counter"
import { Link } from "./Link"

export type PageProps = {
  initialCounterValue: number
}

export const Page = ({ initialCounterValue }: PageProps) => {
  console.log("Rendering the page")

  return (
    <div>
      <Counter initialValue={initialCounterValue} />
      <ul>
        <li>
          <Link path={"/red/0"}>Red 0</Link>
        </li>
        <li>
          <Link path={"/red/100"}>Red 100</Link>
        </li>
        <li>
          <Link path={"/blue/0"}>Blue 0</Link>
        </li>
        <li>
          <Link path={"/blue/100"}>Blue 100</Link>
        </li>
        <li>
          <Link path={"/silver/200"}>Silver 200</Link>
        </li>
      </ul>
    </div>
  )
}
