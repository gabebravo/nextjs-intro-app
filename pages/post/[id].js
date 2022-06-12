import Link from 'next/link';

// This function gets called at build time
export async function getStaticPaths() {
  // Return an array of possible value for id
  // Call an external API endpoint to get posts
  const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await postsRes.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => {
    return {
      params: {
        id: post.id.toString(),
      },
    };
  });

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the user `id`.
  // If the route is like /users/1, then params.id is 1
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await res.json();

  // Pass post data to the page via props
  return { props: { post } };
}

export default function AuthorInfo({ post }) {
  // body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  // id: 2
  // title: "qui est esse"
  // userId: 1

  return (
    <div className="root">
      <div>
        <h1>{`Post Page ${post.id}`}</h1>
        <h2>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </h2>
      </div>
      <div>
        <ul>
          <li>
            <p>title: {post.title}</p>
          </li>
          <li>
            <p>body: {post.body}</p>
          </li>
        </ul>
      </div>
      <style jsx global>{`
        .root {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        ul {
          list-style-type: none; /* Remove bullets */
          padding: 0; /* Remove padding */
          margin: 0; /* Remove margins */
        }
      `}</style>
    </div>
  );
}
