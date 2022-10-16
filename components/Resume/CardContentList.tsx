type Props = {
  lists: {
    title: string;
    contentList: string[];
  }[]
};

export default function CardContentList({ lists }: Props) {
  return (<>{
    lists.map(list =>
      <div key={list.title} className="mt-3">
        <p className="font-bold ml-[3px]">{list.title}</p>
        <ul className="list-disc ml-5">
          {list.contentList.map(txt =>
            <li key={txt}>{txt}</li>
          )}
        </ul>
      </div>
    )
  }</>)
}
