import React from "react";
import { FormEvent } from "react";
import { useRouter } from "next/router";
import { SignInUp } from "@/enum";
import CONST from "@/const";
import { useGlobalDispatch } from "@/context";

export type Props = {
  type?: SignInUp.Login | SignInUp.SignUp;
};

export default function AuthForm({ type = SignInUp.Login }: Props) {
  const dispatch = useGlobalDispatch();
  const isLogin = type === SignInUp.Login;
  const router = useRouter();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const {
      username: { value: username },
      password: { value: password },
    } = event.target as HTMLFormElement;
    const response = await fetch("/api/auth", {
      body: JSON.stringify({ username, password, type }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await response.json();
    if (result.valid) {
      const userInfo: object = result.data;
      console.log(userInfo, "====userInfo===");

      dispatch(userInfo);
      localStorage.setItem(CONST.USER_INFO, JSON.stringify(userInfo));
      router.push(`/${username}`);
    } else {
      alert(result.msg);
    }
    // alert(`Is this your full name: ${result}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label className="block">
        <span className="text-gray-700">User Name</span>
        <input
          type="text"
          required
          name="username"
          className="
                mt-1
                block
                w-full
                rounded-md
                border-gray-300
                shadow-sm
                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              "
          placeholder=""
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Password</span>
        <input
          type="password"
          required
          name="password"
          className="
                mt-1
                block
                w-full
                rounded-md
                border-gray-300
                shadow-sm
                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              "
          placeholder=""
        />
      </label>
      <button
        type="submit"
        className="w-full bg-sky-400 text-white mt-4 h-12 rounded-md"
      >
        {isLogin ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}
