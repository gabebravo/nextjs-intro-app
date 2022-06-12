import React from 'react';
import Link from 'next/link';

// author: "Leanne Graham"
// body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
// id: 1
// image: "https://via.placeholder.com/150/92c952"
// title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
// userId: 1

export default function BlogPost({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <ul key={post.id}>
          <li>
            <p>
              title:{' '}
              <Link href={`/post/${post.id}`}>
                <a>{post.title}</a>
              </Link>
            </p>
          </li>
          <li>
            <p>
              by:{' '}
              <Link href={`/author/${post.id}`}>
                <a>{post.author}</a>
              </Link>
            </p>
          </li>
          <li>
            <img src={post.image} />
          </li>
          <li>
            <p>{post.body}</p>
          </li>
          <hr></hr>
        </ul>
      ))}
      <style jsx global>{`
        ul {
          list-style-type: none; /* Remove bullets */
          padding: 0; /* Remove padding */
          margin: 0; /* Remove margins */
        }
      `}</style>
    </div>
  );
}
