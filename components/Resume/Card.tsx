type Props = {
  title: string;
  subTitle: string;
  imgUrl?: string;
  contentTitle?: string;
  content: JSX.Element,
  reverse?: boolean;
}

export default function Card({
  title,
  subTitle,
  imgUrl,
  contentTitle,
  content,
  reverse,
}: Props) {
  return (
    <div className={`flex-none sm:flex my-8 leading-7${reverse ? " flex-row-reverse" : ""}`}>
      <div className="w-full sm:w-44 my-2">
        <h3 className="text-[22px] font-bold">{title}</h3>
        <small className="text-gray-400">{subTitle}</small>
      </div>
      <div className={`w-full sm:w-[calc(100%-theme(space.52))] whitespace-pre-line${reverse ? " sm:mr-auto" : " sm:ml-auto"}`}>
        {imgUrl && <img className="w-full" src={imgUrl} alt={title} />}
        {contentTitle && <p className="text-[19px] font-bold mt-4 sm:mt-2 mb-2">{contentTitle}</p>}
        {content}
      </div>
    </div>
  )
}
