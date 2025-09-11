import type { PostProps } from "@/types";
import Link from "@component/Link";

function PostCard({
  id,
  title,
  body,
  category,
  author,
  thumbnail_url,
}: PostProps) {
  return (
    <Link to={{ pathname: `/posts/${id}` }}>
      <div className="news-card">
        <div className="news-image">
          <img src={thumbnail_url} loading="lazy" />
        </div>
        <div className="news-content">
          <div className="news-title">
            <h2>{title}</h2>
          </div>
          <div className="news-description">
            <p>{body}</p>
          </div>
          <div className="news-meta">
            <span className="news-author">{author} 기자</span>
            <span className="news-category">{category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
