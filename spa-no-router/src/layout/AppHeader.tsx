import "./AppHeader.css";
import Link from "../components/Link";
export default function AppHeader() {
  return (
    <header className="site-header">
      <h1>PostNews</h1>
      <nav>
        <ul>
          <li>
            <Link to={{ pathname: "/" }}>Home</Link>
          </li>
          <li>
            <Link to={{ pathname: "/posts" }}>Posts</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
