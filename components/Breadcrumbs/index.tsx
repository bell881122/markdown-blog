import ArrowIcon from "components/ArrowIcon";

type Props = {
  slug: string[];
}

export default function Breadcrumbs({ slug }: Props) {
  return (
    <div className="flex flex-wrap">
      {slug.map((dir, index) => {
        const isLast = index === slug.length - 1;
        return (
          <small key={index} className="flex">
            <a
              href={isLast ? undefined : `/post/${slug.slice(0, index + 1).join("/")}`}
              className={`inline-block ${!isLast ? "text-cyan-600" : "no-underline text-gray-400"}`}
            >{dir}</a>
            {!isLast && <ArrowIcon wrapperClass="flex mx-2" />}
          </small>
        )
      })}
    </div>
  )
}
