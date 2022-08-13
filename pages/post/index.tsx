import type { NextPage } from 'next'
import { getRecurseMdFileData } from 'utils/utils';
import { postDataArr } from 'pages/post/[...slug]';
import PostCard from 'components/postCard';

export async function getStaticProps() {
  const posts = getRecurseMdFileData("posts")
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