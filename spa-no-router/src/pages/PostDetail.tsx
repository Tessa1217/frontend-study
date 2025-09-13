import { useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "@/constants/index";
import { useParams } from "@/hooks/useParams";
import type { PostProps } from "@/types";
import Link from "@/components/Link";
import SkeletonDetailCard from "@/components/SkeletonDetailCard";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      await sleep(2000);
      const response = await fetch(`${API_BASE_URL}/news/${id}`);
      if (response.status !== 200)
        throw new Error("뉴스 데이터를 불러올 수 없습니다.");
      const data = await response.json();
      setPost(data);
    } catch (err: any) {
      setError(err?.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id, fetchPost]);

  if (!id) return null;

  if (loading)
    return (
      <section>
        <SkeletonDetailCard />
      </section>
    );

  if (!loading && !post)
    return (
      <section>
        <div className="error-card">
          <p>{error}</p>
          <Link className="back-btn" to="/posts">
            돌아가기
          </Link>
        </div>
      </section>
    );

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

export default PostDetail;
