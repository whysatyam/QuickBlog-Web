import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 h-screen w-full px-10 pt-12 max-w-screen-xl">
          <div className="col-span-8">
            <div className="text-2xl font-bold">{blog.title}</div>
            <div className="py-5 text-gray-500">All Rights Reserved</div>
            <div className="pt-3 h-screen">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="flex justify-center gap-2">
              <div className="flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-md pt-2 text-gray-500">Author</div>
                <div className=" text-1xl font-bold">
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