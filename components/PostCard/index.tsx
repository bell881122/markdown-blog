import { postData } from "pages/post/[...slug]";
import { useState, useEffect } from "react";

type Props = {
  postDataArr: postData[];
}

const PostCard = ({ postDataArr }: Props) => {
  const [posts, setPosts] = useState(postDataArr);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const numPerPage = 24;

  useEffect(() => {
    setTotalPage(Math.ceil(postDataArr.length / numPerPage))
  }, [postDataArr])

  useEffect(() => {
    setPosts(postDataArr.slice((currentPage - 1) * numPerPage, currentPage * numPerPage))
  }, [postDataArr, currentPage])

  return (
    <div className="flex flex-col mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0">
        {posts.map(post => {
          const { slug, data, lastModified } = post
          const url = slug.join("/");
          return !data ? null : (
            <a
              key={url}
              href={`/post/${url}`}
              className="border border-gray-200 m-2 rounded-xl shadow-xl overflow-hidden cursor-pointer"
            >
              <div
                className="w-full h-[250px] sm:h-[180px] md:h-[150px] lg:h-[100px]"
                style={{
                  background: `url(${data.coverImage}) center center`,
                  backgroundSize: "cover"
                }}
              />
              <div className="p-4 h-[calc(100%-250px)] sm:h-[calc(100%-180px)] md:h-[calc(100%-150px)] lg:h-[calc(100%-100px)] flex flex-col">
                <h1 className="mb-auto font-bold">{data.title}</h1>
                <small className="block mt-2">{data.date}</small>
                <small className="block text-gray-400">{`最後更新：${lastModified}`}</small>
                {/* <div className="flex flex-wrap">
                  {data.tags && data.tags.length && data.tags.toString().split(",").map((tag, index) => (
                    <small key={index} className={`px-2 py-0 block mt-1.5 text-gray-400 border border-gray-400 rounded-[8px] ${index !== data.tags.length - 1 ? "mr-1" : ""}`}>{tag}</small>
                  ))}
                </div> */}
              </div>
            </a>
          );
        })}
      </div>
      {totalPage > 1 &&
        <div className="mx-auto mt-4">
          {Array.from({ length: totalPage }, (_, i) => i + 1).map(page =>
            <span
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`my-1 mx-2 ${page !== currentPage ? "text-cyan-600 cursor-pointer" : "font-bold"}`}
            >{page}</span>
          )}
        </div>
      }
    </div>
  )
}

export default PostCard;