
export type HeadProps = {
  title: string
}

export const Head = ({ title }: HeadProps) => {
  return (
    <title>{title}</title>
  )
}
