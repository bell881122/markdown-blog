import md from 'markdown-it';
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { recurseAllPaths, getMdFile } from 'utils/utils';

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

  if (slug[slug.length - 1].endsWith(".md")) {
    const filePath = `posts/${slug.join("/")}`
    const { data, content } = getMdFile(filePath);
    return {
      props: { slug, data, content }
    }
  }
  
  return {
    props: { slug }
  }
}

export default function PostPage({ slug, data, content }: postData) {
  return !data ? <>{slug.join("/")}</> : (
    <>
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
    </>
  );
}