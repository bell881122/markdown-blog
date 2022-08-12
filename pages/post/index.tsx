import type { NextPage } from 'next'
import Link from 'next/link';
import React from 'react';
import { recurseAllPaths } from 'utils/utils';

type Props = {
  posts: string[][];
}

export async function getStaticProps() {
  const posts = recurseAllPaths("posts")
    .map(x => x.params.slug)
  return { props: { posts } };
}

const Index: NextPage<Props> = ({ posts }) => {
  return (
    <>
      {posts.map(item => {
        const url = `post/${item.join("/")}`;
        return (
          <Link key={url} href={url}>
            <p>{url}</p>
          </Link>
        )
      })}
    </>
  )
}

export default Index