import Link from 'next/link';

// This function gets called at build time
export async function getStaticPaths() {
  // Return an array of possible value for id
  // Call an external API endpoint to get posts
  const usersRes = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await usersRes.json();

  // Get the paths we want to pre-render based on posts
  const paths = users.map((user) => {
    return {
      params: {
        id: user.id.toString(),
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
    `https://jsonplaceholder.typicode.com/users/${params.id}`
  );
  const author = await res.json();

  // Pass post data to the page via props
  return { props: { author } };
}

export default function AuthorInfo({ author }) {
  // address: {street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998-3874', geo: {…}}
  // company: {name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: 'harness real-time e-markets'}
  // email: "Sincere@april.biz"
  // id: 1
  // name: "Leanne Graham"
  // phone: "1-770-736-8031 x56442"
  // username: "Bret"
  // website: "hildegard.org"

  return (
    <div className="root">
      <div>
        <h1>Author Info Page</h1>
        <h2>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </h2>
      </div>
      <div>
        <ul>
          <li>
            <p>name: {author.name}</p>
          </li>
          <li>
            <p>username: {author.username}</p>
          </li>
          <li>
            <p>phone: {author.phone}</p>
          </li>
          <li>
            <p>email: {author.email}</p>
          </li>
          <li>
            <p>website: {author.website}</p>
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
