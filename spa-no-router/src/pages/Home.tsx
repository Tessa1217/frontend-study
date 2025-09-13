import Link from "@/components/Link";
import { NEWS_CATEGORY_LIST } from "@/constants";

function Home() {
  return (
    <section>
      <h2 className="section-header">카테고리별 뉴스보러 가기</h2>
      <div className="home-category-wrapper">
        <ul className="home-category">
          {NEWS_CATEGORY_LIST.map((cat) => (
            <li>
              <Link to={`/posts?category=${cat.value}`}>{cat.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Home;
