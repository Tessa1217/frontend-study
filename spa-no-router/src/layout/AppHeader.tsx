import Link from "@component/Link";

function AppHeader() {
  return (
    <header className="header">
      <h1>Simple News Feed</h1>
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

export default AppHeader;
