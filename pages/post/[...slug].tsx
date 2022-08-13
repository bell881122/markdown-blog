import md from 'markdown-it';
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { recurseAllPaths, getMdFile, getRecurseMdFileData } from 'utils/utils';
import PostCard from 'components/postCard';

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
}

export type postDataArr = {
  posts: postData[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = recurseAllPaths("posts").filter(path => path);
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = (context) => {
  const { slug } = context.params as IParams;
  const filePath = `posts/${slug.join("/")}`

  if (filePath.endsWith(".md")) {
    const { data, content } = getMdFile(filePath);
    return {
      props: { slug, data, content }
    }
  }

  const posts = getRecurseMdFileData(filePath)
  return {
    props: { posts }
  }
}

export default function PostPage(post: postData | postDataArr) {
  const { data, content } = post as unknown as postData;
  return content ? <>
    <div
      className='w-full h-[400px]'
      style={{
        background: `url(${data.coverImage}) center center`,
        backgroundSize: 'cover'
      }}
    />
    <div className="max-w-[1000px] mx-auto">
      <div className='prose py-10 px-8 max-w-full shadow-2xl'>
        <h1 className='text-[32px] mb-1 leading-9'>{data.title}</h1>
        <small className='block mb-4 text-gray-400'>{data.date}</small>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </div>
    </div>
  </> : <PostCard postDataArr={(post as postDataArr).posts} isRoot={true} />
}