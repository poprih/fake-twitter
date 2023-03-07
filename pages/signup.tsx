import SignInUpForm from "@/components/SignInUpForm";
import { SignInUp } from "@/enum";
import Link from "next/link";

const Signup = () => {
  return (
    <div className="p-6">
      <h1 className="text-center text-lg">Sign Up Fake Twitter</h1>
      <SignInUpForm type={SignInUp.SignUp} />
      <div className="mt-2">
        Already have an account?
        <Link href="/login" className="text-cyan-400">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Signup;
