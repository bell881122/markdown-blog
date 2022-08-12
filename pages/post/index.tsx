import type { NextPage } from 'next'
import { recurseAllPaths, getMdFileData } from 'utils/utils';
import { postDataArr } from 'pages/post/[...slug]';
import PostCard from 'components/postCard';

export async function getStaticProps() {
  const paths = recurseAllPaths("posts").map(x => x.params.slug);
  const posts = paths.map(pathArr => getMdFileData(pathArr)).filter(post => post)
  return {
    props: {
      posts
    }
  };
}

const Index: NextPage<postDataArr> = ({ posts }) => {
  return (
    <PostCard postDataArr={posts} />
  )
}

export default Index