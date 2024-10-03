import { Routes, Route } from "react-router-dom";

import BlogLayout from "./components/blog/BlogLayout";
import HomePage from "./pages/HomePage";
import NewBlogPage from "./pages/admin/NewBlogPage";
import AdminLayout from "./components/admin/AdminLayout";
import { useRecoilState } from "recoil";
import { userAtom } from "./recoil/atom/userAtom";
import BlogPage from "./pages/blog/BlogPage";
import BlogsPage from "./pages/admin/BlogsPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import ProfilePage from "./pages/user/ProfilePage";

function App() {
  const [user, setUser] = useRecoilState(userAtom);

  return (
    <div>
      <Routes>
        <Route path="/" element={<BlogLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />

          <Route path="/admin/" element={<AdminLayout />}>
            <Route path="create-blog" element={<NewBlogPage />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
