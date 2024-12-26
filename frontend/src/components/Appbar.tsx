import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import AppbarLogo from "./AppbarLogo";
import { toast } from "react-hot-toast";

export const Appbar = () => {
  const navigate = useNavigate();
  return (
    <div className="border-b-2 py-1 border-gray-200 px-10 flex justify-between">
      <div className="flex items-center gap-4">
        <Link to="/blogs">
          <div className="ml-[-35px] mt-[-2px]">
            <AppbarLogo />
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-1 mr-[-35px]">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            toast.success("Goodbye, See you next time"); 
            navigate("/signin");
          }}
          className="relative px-5 h-7 w-28 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
        >
          <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
          <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
          <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
          <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
            Sign Out
          </span>
        </button>
        <button
          onClick={() => {
            navigate("/publish");
          }}
          className="relative px-5 h-7 w-28 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
        >
          <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-green-600 group-hover:w-full ease"></span>
          <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-green-600 group-hover:w-full ease"></span>
          <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-green-600 group-hover:h-full ease"></span>
          <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-green-600 group-hover:h-full ease"></span>
          <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-green-900 opacity-0 group-hover:opacity-100"></span>
          <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
            Publish
          </span>
        </button>
        <div  className="hidden sm:block">
        <Avatar size={"big"} name="U" />
        </div>
      </div>
    </div>
  );
};