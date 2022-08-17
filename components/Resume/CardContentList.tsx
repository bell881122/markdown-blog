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
        {list.contentList.map(txt =>
          <p key={txt}>{txt}</p>
        )}
      </div>
    )
  }</>)
}
