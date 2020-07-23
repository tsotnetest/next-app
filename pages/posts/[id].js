import Layout from '../../components/layout';
import React from 'react';
import { useRouter } from 'next/router'
import Error from '../_error';

export default function Post({postData}) {
  console.log('postData', postData)
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if(!postData){
    return <Error statusCode={'404'}/>
  }

  return (
      <Layout>
        {postData.text}
        <br />
        {postData.id}
        <br />
      </Layout>
  );
}

const data = [
  {
    id: 'first',
    text: 'aaaaaaa'
  },
  {
    id: 'second',
    text: 'bbbbbbb'
  }
]

export async function getStaticPaths() {
  const paths = data.map(d => {
    return (
        {
          params: {
            id: d.id,
          },
        }
    )
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const postData = data.find(d => d.id === params.id)
  return {
    props: {
      errorCode: 404,
      postData: postData || null
    }
  }
}