import { useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "@/constants/index";
import { useParams } from "@/hooks/useParams";
import type { PostProps } from "@/types";
import Link from "@/components/Link";
export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams();

  const fetchPost = useCallback(async () => {
    setLoading(true);
    const response = await fetch(`${API_BASE_URL}/news/${id}`);
    if (response.status !== 200) return null;
    const data = await response.json();
    setPost(data);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id, fetchPost]);

  if (!id) return null;

  if (loading) return <div>Loading...</div>;

  if (!loading && !post) return null;

  const { title, body, author, category, thumbnail_url } = post!;

  return (
    <section>
      <div className="news-detail">
        <h2 className="detail-title">{title}</h2>
        <div className="detail-image">
          <img src={thumbnail_url} />
        </div>
        <div className="detail-meta">
          <span>{author} 기자</span>
          <span>{category}</span>
        </div>
        <div className="detail-content">
          <p>{body}</p>
        </div>
        <Link className="back-btn" to="/posts">
          돌아가기
        </Link>
      </div>
    </section>
  );
}
