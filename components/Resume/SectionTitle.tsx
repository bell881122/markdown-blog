type Props = {
  title: string;
}

export default function SectionTitle({ title }:Props) {
  return (
    <h2 className="text-[32px] font-bold">{title}</h2>
  )
}
