import React from "react";
import SignInUpForm from "@/components/SignInUpForm";
import Link from "next/link";

function Login() {
  return (
    <div className="p-6">
      <h1 className="text-center text-lg">Sign In Fake Twitter</h1>
      <SignInUpForm />
      <div className="mt-2">
        Do not have an account?
        <Link href="/signup" className="text-cyan-400">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
