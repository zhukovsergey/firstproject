import { Routes, Route } from "react-router-dom";

import BlogLayout from "./components/blog/BlogLayout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BlogLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
