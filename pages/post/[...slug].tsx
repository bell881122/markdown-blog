import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { recurseAllPaths,getMdFile } from 'utils/utils';

interface IParams extends ParsedUrlQuery {
  slug: string[]
}

type postData = {
  slug: string[],
  data?: {
    title: string;
    date: string;
    tags: string;
    coverImage: string;
    draft: boolean;
  },
  content?: string,
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
      <p>{slug.join("/")}</p>
      <p>{data.title}</p>
      <p>{data.date}</p>
    </>
  );
}