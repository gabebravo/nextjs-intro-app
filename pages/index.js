import React from 'react';
import Head from 'next/head';
import Alert from '../components/AlertToggle';
import BlogPost from '../components/BlogPost';

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const postRes = await fetch('https://jsonplaceholder.typicode.com/posts');
  const userRes = await fetch('https://jsonplaceholder.typicode.com/users');
  const photoRes = await fetch('https://jsonplaceholder.typicode.com/photos');
  const posts = await postRes.json();
  const users = await userRes.json();
  const photos = await photoRes.json();

  const postList = users.reduce((acc, user, index) => {
    const newPost = {
      ...posts[index],
      author: user?.name,
      image: photos[index]?.thumbnailUrl,
    };
    acc.push(newPost);
    return acc;
  }, []);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts: postList,
    },
  };
}

export default function Home({ posts }) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">Blog Posts </h1>
        <Alert />
        <BlogPost posts={posts} />
      </main>

      <footer>
        <p>This is the homepage</p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          color: blue;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 2rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
