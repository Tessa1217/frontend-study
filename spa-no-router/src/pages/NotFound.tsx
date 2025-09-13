import Link from "@/components/Link";

function NotFound() {
  return (
    <section className="not-found-container">
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">페이지를 찾을 수 없습니다</h2>
      <p className="not-found-content">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link to="/" className="back-home-btn">
        홈으로 돌아가기
      </Link>
    </section>
  );
}

export default NotFound;
