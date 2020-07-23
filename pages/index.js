import Head from 'next/head';
import Layout, {siteTitle} from '../components/layout';
import Link from 'next/link';

export default function Home(props) {
  console.log('data', props.data)
  return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <Link href={"/posts/first"}><a>first</a></Link>
        {
          <section>
            <h2 >Blog</h2>
            <ul>
              {props.data.map(({text, id }) => (
                  <li  key={id}>
                    <Link href="/posts/[id]" as={`/posts/${id}`}>
                      <a>{text}</a>
                    </Link>
                    <br />
                  </li>
              ))}
            </ul>
          </section>
        }
      </Layout>
  )
}

// export async function getStaticProps() {
export async function getServerSideProps(context) {
  console.log('context',context)
  // Get external data from the file system, API, DB, etc.
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

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {data}
  }
}