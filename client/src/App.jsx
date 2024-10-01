import { Routes, Route } from "react-router-dom";

import BlogLayout from "./components/blog/BlogLayout";
import HomePage from "./pages/HomePage";
import NewBlogPage from "./pages/admin/NewBlogPage";
import AdminLayout from "./components/admin/AdminLayout";
import { useRecoilState } from "recoil";
import { userAtom } from "./recoil/atom/userAtom";

function App() {
  const [user, setUser] = useRecoilState(userAtom);

  

  return (
    <div>
      <Routes>
        <Route path="/" element={<BlogLayout />}>
          <Route index element={<HomePage />} />

          <Route path="/admin/" element={<AdminLayout />}>
            <Route path="create-blog" element={<NewBlogPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
