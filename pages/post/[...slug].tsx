import md from "markdown-it";
import { GetStaticPaths, GetStaticProps } from "next"
import { useEffect } from "react";
import { ParsedUrlQuery } from "querystring"
import { getAllPaths, getMdFile, getRecurseMdFileData, checkIsMd, checkIsNotDraft } from "utils/utils";
import PostCard from "components/PostCard";
import ArrowIcon from "components/ArrowIcon";
import Breadcrumbs from "components/Breadcrumbs";

interface IParams extends ParsedUrlQuery {
  slug: string[]
}

export type postData = {
  slug: string[];
  data: {
    title: string;
    date: string;
    tags: string;
    coverImage: string;
    draft: boolean;
  };
  content?: string;
  lastModified?: string;
  postPaths?: string[][];
}

export type postDataArr = {
  posts: postData[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPaths("posts");
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = (context) => {
  const { slug } = context.params as IParams;
  const filePath = `posts/${slug.join("/")}`

  if (checkIsMd(filePath)) {
    const { data, content } = getMdFile(filePath);
    const rootPath = slug.slice(0, slug.length - 1).join("/");
    const postPaths = getAllPaths(`posts/${rootPath}`, false)
      .map(postPath => postPath.params.slug)
      .filter(postPath => {
        const path = postPath.join("/")
        return !checkIsMd(path) || checkIsMd(path) && checkIsNotDraft(`posts/${path}`)
      })
    return {
      props: { slug, data, content, postPaths }
    }
  }

  const posts = getRecurseMdFileData(filePath)
  return {
    props: { posts }
  }
}

export default function PostPage(post: postData | postDataArr) {
  const { slug, data, content, postPaths } = post as unknown as postData;

  // 外部連結改為開啟新視窗
  useEffect(() => {
    const stripeExist = document.getElementById("stripe")
    if (!stripeExist) {
      const aScript = document.createElement("script");
      aScript.id = "stripe";
      aScript.type = "text/javascript";
      aScript.src = " https://js.stripe.com/v3/";

      document.head.appendChild(aScript);
      aScript.onload = () => {
        var links = document.querySelectorAll("a");
        for (var i = 0, length = links.length; i < length; i++) {
          if (links[i].hostname != window.location.hostname) {
            links[i].target = "_blank";
          }
        }
      };
    }
  }, [])

  return content ? <>
    <div className="md:flex flex-row-reverse">
      <div className="md:w-[calc(100%-theme(space.32))]">
        <div
          className="w-full h-[400px]"
          style={{
            background: `url(${data.coverImage}) center center`,
            backgroundSize: "cover"
          }}
        />
        <div className="max-w-[1000px] mx-auto">
          <div className="prose pt-4 pb-8 px-8 max-w-full shadow-2xl">
            <Breadcrumbs slug={slug} />
            <h1 className="text-[28px] sm:text-[34px] mt-6 mb-1 ml-[-3px] leading-normal">{data.title}</h1>
            <small className="block mb-6 text-gray-400">{data.date}</small>
            <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
          </div>
        </div>
      </div>
      <div className="mr-0 md:mr-5 overflow-y-auto md:mt-0 md:w-32 md:hover:w-64 transition-[width] ease-in-out">
        <ul className="mt-8 md:mt-3">
          {postPaths!.map(item => {
            const url = item.join("/");
            const isFolder = item[item.length - 1].indexOf(".md") < 0;
            const title = item[item.length - 1].replace(".md", "");
            const isCurrentPost = url === slug.join("/");
            return (
              <li key={url} className={`flex ${isFolder ? "p-1" : "my-1"}`}>
                <a
                  href={isCurrentPost ? undefined : `/post/${url}`}
                  className={`${isCurrentPost ? "" : "text-cyan-600"} ${isFolder ? "w-full flex items-center font-bold" : ""} text-ellipsis overflow-hidden whitespace-nowrap`}
                >
                  <small className={`${isFolder ? "text-[14px]" : ""}`}>
                    {title}
                  </small>
                  {isFolder &&
                    <span className="ml-auto mr-[2px]">
                      <ArrowIcon innerClass="border-cyan-600" />
                    </span>
                  }
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  </> : <PostCard postDataArr={(post as postDataArr).posts} />
}