import BrowserRouter from "./router/BrowserRouter";
import AppLayout from "./layout/AppLayout";
import Routes from "./router/Routes";
import Route from "./router/Route";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import NotFound from "@/pages/NotFound";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Home */}
          <Route index={true} element={<Home />} />
          {/* Posts */}
          <Route path="posts" element={<Posts />} />
          {/* Post Detail */}
          <Route path="posts/:id" element={<PostDetail />} />
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
