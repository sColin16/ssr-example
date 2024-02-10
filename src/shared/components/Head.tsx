
export type HeadProps = {
  title: string
}

export const Head = ({ title }: HeadProps) => {
  return (
    <head>
      <title>{title}</title>
    </head>
  )
}
