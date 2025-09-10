import { useState, useEffect } from "react";
import type { PostProps } from "../types";
import "./Posts.css";
import Link from "../components/Link";
function PostCard({ id, title, body }: PostProps) {
  return (
    <li>
      <Link to={{ pathname: `/posts/${id}` }}>
        <div className="card">
          <div className="card-header">
            <h2>{title}</h2>
          </div>
          <div className="card-body">
            <p>{body}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default function Post() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  const fetchPosts = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_starts=0&_limit=10"
    );
    if (response.status !== 200) return null;
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section>
      <h2 className="section-header">포스트</h2>
      <ul className="card-list">
        {posts.map((post) => (
          <PostCard key={`post_${post.id}`} {...post} />
        ))}
      </ul>
    </section>
  );
}
