import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { useEffect } from "react";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blog]);
  
  return (
    <>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 h-screen w-full px-10 pt-12 max-w-screen-xl">
          <div className="col-span-12 md:col-span-8">
            <div className="text-2xl font-bold">{blog.title}</div>
            <div className="py-5 font-serif text-gray-500">
              Create | Share | Inspire
            </div>
            <div className="pt-3 h-screen">{blog.content}</div>
          </div>
          <div className="col-span-12 md:col-span-4 hidden md:block">
            <div className="flex justify-center gap-2">
              <div className="flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-md text-gray-500">Author</div>
                <div className="text-1xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};