import { useState } from 'react';
import Layout from '../components/Layout';


type Props = {
  posts: Post[];
  sondages: Sondage[];
}

export async function getServerSideProps() {
  try {
    let responsePosts = await fetch('http://localhost:3000/api/posts/getPosts');
    let posts = await responsePosts.json();

    let responseSondages = await fetch('http://localhost:3000/api/sondages/getSondages');
    let sondages = await responseSondages.json();



    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
        // posts: [],
        sondages: JSON.parse(JSON.stringify(sondages)),
        // sondages: [],
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        posts: [],
        sondages: [],
      },
    };
  }
}

export default function Posts(props: Props) {
  const [posts, setPosts] = useState<Post[]>(props.posts);
  const [sondages, setSondages] = useState<Sondage[]>(props.sondages);





  const handleDeletePost = async (postId: string) => {
    try {
      let response = await fetch(
        "http://localhost:3000/api/posts/deletePost?id=" + postId,
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();
      window.location.reload();
    } catch (error) {
      console.log("An error occurred while deleting ", error);
    }
  };

  const handleDeleteSondage = async (sondageId: string) => {
    try {
      let response = await fetch(
        "http://localhost:3000/api/sondages/deleteSondage?id=" + sondageId,
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();
      window.location.reload();
    } catch (error) {
      console.log("An error occurred while deleting sondage ", error);
    }
  };



  return (
    <Layout>
      <div className="posts-body">
        <h1 className="posts-body-heading">Top 20 Added Sondages</h1>
        {sondages.length > 0 ? (
          <ul className="posts-list">
            {sondages.map((sondage, index) => {
              return (
                <li key={index} className="post-item">
                  <div className="post-item-details">
                    <h2>{sondage.title}</h2>

                    <p>{sondage.description}</p>
                  </div>
                  <div className="post-item-actions">
                    <a href={`/sondages/${sondage._id}`}>Edit</a>
                    <button onClick={() => handleDeleteSondage(sondage._id as string)}>
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <h2 className="posts-body-heading">Ooops! No sondages added so far</h2>
        )}
      </div>
      <div className="posts-body">
        <h1 className="posts-body-heading">Top 20 Added Posts</h1>
        {posts.length > 0 ? (
          <ul className="posts-list">
            {posts.map((post, index) => {
              return (
                <li key={index} className="post-item">
                  <div className="post-item-details">
                    <h2>{post.title}</h2>

                    <p>{post.content}</p>
                  </div>
                  <div className="post-item-actions">
                    <a href={`/posts/${post._id}`}>Edit</a>
                    <button onClick={() => handleDeletePost(post._id as string)}>
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <h2 className="posts-body-heading">Ooops! No posts added so far</h2>
        )}
      </div>
      <style jsx>
        {`
          .posts-body {
            width: 400px;
            margin: 10px auto;
          }
          .posts-body-heading {
            font-family: sans-serif;
            margin: 0 auto 20px;
          }
          h2.posts-body-heading {
            color: #ddd;
          }
          .posts-list {
            list-style-type: none;
            display: block;
          }
          .post-item {
            width: 100%;
            padding: 0 10px 10px;
            border: 1px solid #d5d5d5;
          }
          .post-item h2 {
            margin: 10px
          }
          .post-item-actions {
            display: flex;
            justify-content: space-between;
          }
          .post-item-actions a {
            text-decoration: none;
          }
        `}
      </style>
    </Layout>
  );
}
