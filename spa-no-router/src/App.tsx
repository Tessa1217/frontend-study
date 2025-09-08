import "./App.css";
import AppHeader from "./layout/AppHeader";
import Routes from "./router/Routes";
import Route from "./router/Route";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import BrowserRouter from "./router/BrowserRouter";

function App() {
  return (
    <BrowserRouter>
      <>
        <AppHeader />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostDetail />} />
          </Routes>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
