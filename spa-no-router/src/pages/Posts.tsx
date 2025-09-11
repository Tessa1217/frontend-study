import { useState, useEffect } from "react";
import type { PostProps } from "@/types";
import PostCard from "@/components/PostCard";

export default function Post() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  const fetchPosts = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_SERVER_URL}/news?_start=10&_limit=10`
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
      <div className="news-list">
        {posts.map((post) => (
          <PostCard key={`post_${post.id}`} {...post} />
        ))}
      </div>
    </section>
  );
}
