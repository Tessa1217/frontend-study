import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "@/hooks/useSearchParams";
import { usePagination } from "@/hooks/usePagination";
import { API_BASE_URL } from "@/constants";
import type { PostProps } from "@/types";
import SkeletonList from "@/components/SkeletonList";
import PostCard from "@/components/PostCard";
import MoreButton from "@/components/MoreButton";
import Outlet from "@/router/Outlet";

// Skeleton UI Test
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Posts() {
  // Posts
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchingMore, setFetchingMore] = useState(false);

  // Pagination
  const { page, start, setPage, limit } = usePagination();

  // Search Params
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const fetchPosts = useCallback(async () => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setFetchingMore(true);
      }
      setError(null);
      await sleep(2000);
      const url = `${API_BASE_URL}/news?_start=${start}&_limit=${limit}${
        category && "&category=" + category
      }`;
      const response = await fetch(url);
      if (response.status !== 200)
        throw new Error("뉴스 데이터를 불러올 수 없습니다.");
      const data = await response.json();
      setPosts((prev) => {
        const merged = [...prev, ...data].filter((p, idx, arr) => {
          return arr.findIndex((x) => x.id === p.id) === idx;
        });
        return merged;
      });
    } catch (err: any) {
      setError(err?.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  }, [start, limit, category]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const addMorePage = () => setPage((state) => state + 1);

  if (loading) {
    return (
      <section>
        <h2 className="section-header">포스트</h2>
        <div className="news-list">
          <SkeletonList count={5} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h2 className="section-header">포스트</h2>
        <div className="error-card">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (!loading && posts.length === 0) {
    return (
      <section>
        <h2 className="section-header">포스트</h2>
        <div className="no-news-card">
          <div className="no-news">
            <p>현재 작성된 뉴스가 없습니다.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="section-header">포스트</h2>
      <div className="news-list">
        {posts.map((post) => (
          <PostCard key={`post_${post.id}`} {...post} />
        ))}
      </div>
      <MoreButton addMorePage={addMorePage} loading={fetchingMore} />
      <Outlet />
    </section>
  );
}

export default Posts;
