import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Publish } from "./pages/Publish";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
      <Toaster />
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;