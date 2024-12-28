import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";

import { SmallSkeleton } from "../components/SmallSkeleton";
import { SkeletonLoader } from "../components/SkeletonLoader";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  useEffect(() => {
    if (loading) {
      window.scrollTo(0, 0); 
    }
  }, [loading]);

  if (loading || !blog) {
    return (
      <div>
        <Appbar />
        <div className="block xl:hidden">
          <SmallSkeleton />
        </div>
        <div className="hidden xl:block">
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};
