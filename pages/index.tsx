import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGlobal } from "@/context";
import type { GlobalState } from "@/type";

export default function Home() {
  const router = useRouter();
  const globalState: GlobalState = useGlobal();
  useEffect(() => {
    if (globalState.userInfo) {
      router.replace(`/${globalState.userInfo.username}`);
    } else {
      router.replace("/login");
    }
  }, [globalState.userInfo]);
  return (
    <>
      <Head>
        <title>Fake Tweet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    </>
  );
}
