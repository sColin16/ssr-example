export type HeadProps = {
  title: string
}

export const Head = ({ title }: HeadProps) => {
  console.log("Rendering Head Component")

  return <title>{title}</title>
}
