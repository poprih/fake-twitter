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
      dispatch({ userInfo });
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
        <span>User Name</span>
        <input
          type="text"
          required
          name="username"
          className="block w-full mt-1 rounded-md shadow-sm  dark:text-black focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder=""
        />
      </label>
      <label className="block">
        <span>Password</span>
        <input
          type="password"
          required
          name="password"
          className="block w-full mt-1 rounded-md shadow-sm  dark:text-black focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder=""
        />
      </label>
      <button
        type="submit"
        className="w-full h-12 mt-4 text-white rounded-md bg-sky-400"
      >
        {isLogin ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}
