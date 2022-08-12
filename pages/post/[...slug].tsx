import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { recurseAllPaths } from 'utils/utils';

interface IParams extends ParsedUrlQuery {
  slug: string[]
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
  return {
    props: { slug }
  }
}

export default function PostPage({ slug }: IParams) {
  return (
    <>{slug.join("/")}</>
  );
}