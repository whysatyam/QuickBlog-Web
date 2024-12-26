import { SignupInput } from "@whysatyam/medium-common";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

import axios from "axios";
import Loader from "./Loader";
import { toast } from "react-hot-toast";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  async function sendRequest() {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${
          type === "signup" ? "signup" : "signin"
        }`,
        postInputs
      );
      const jwt = res.data.jwt;
      localStorage.setItem("token", jwt);
      toast.success("Welcome, Great to see you");
      navigate("/blogs");
    } catch (err) {
      toast.error("Request failed, Please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center">
      <div className="flex justify-center">
        <div className="w-1/2">
          <div className="px-10">
            <div className="text-2xl font-bold text-center">
              {type === "signup" ? "Sign up with email" : "Sign in with email"}
            </div>
            <div className="mt-1 text-slate-400 text-center">
              {type === "signup" ? "Existing user?" : "Don't have an account?"}{" "}
              <Link
                className="font-semibold underline text-black"
                to={type === "signup" ? "/signin" : "/signup"}
              >
                {type === "signup" ? "signin" : "signup"}
              </Link>
            </div>
          </div>
          <div className="mt-2 pt-2 flex flex-col">
            {type === "signup" && (
              <LabelledInput
                label="Name"
                placeholder="Enter your name"
                onChange={(e) => {
                  setPostInputs({ ...postInputs, name: e.target.value });
                }}
              />
            )}
            <LabelledInput
              label="Email"
              placeholder="Enter your email"
              onChange={(e) => {
                setPostInputs({ ...postInputs, username: e.target.value });
              }}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPostInputs({ ...postInputs, password: e.target.value });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="relative inline-block text-lg group mt-8"
              disabled={loading}
            >
              <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-[28rem] h-96 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span className="relative flex justify-center items-center">
                  {loading ? (
                    <Loader />
                  ) : type === "signup" ? (
                    "Sign up"
                  ) : (
                    "Sign in"
                  )}
                </span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

type LabelledInputProps = {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function LabelledInput({
  label,
  placeholder,
  type,
  onChange,
}: LabelledInputProps) {
  return (
    <div className="mt-4">
      <label
        htmlFor="hero-field"
        className="leading-7 font-medium text-sm text-gray-800"
      >
        {label}
      </label>
      <input
        type={type ? type : "text"}
        id="hero-field"
        name="hero-field"
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-300 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-gray-600 focus:bg-transparent focus:border-gray-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      ></input>
    </div>
  );
}