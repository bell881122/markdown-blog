type Props = {
  lighter?: boolean;
}

export default function Divider({ lighter }: Props) {
  return (
    <hr className={`my-6 ${lighter ? "border-gray-300 border-dashed" : "border-gray-400"} `} />
  )
}
