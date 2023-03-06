import { useEffect, useState } from "react";
import Link from "next/link";
import type { Tweet, GlobalState, User } from "@/type";
import { useGlobal, useGlobalDispatch } from "@/context";
import { useRouter } from "next/router";
import CONST from "@/const";
import d from "dayjs";

type Props = {
  username: String;
};

function TimeLine({ username }: Props) {
  const [tweetList, setTweetList] = useState<Tweet[] | null>([]);
  const [pageNo, setPageNo] = useState(1);
  const dispatch = useGlobalDispatch();
  const globalState: GlobalState = useGlobal();
  const router = useRouter();
  useEffect(() => {
    getTweets();
    return () => {};
  }, [pageNo]);
  useEffect(() => {
    const uInfo = localStorage.getItem(CONST.USER_INFO);
    if (uInfo) {
      dispatch({ userInfo: JSON.parse(uInfo) });
    }
    return () => {};
  }, []);
  async function getTweets() {
    const res = await fetch("/api/tweet/list", {
      method: "GET",
    });
    const { valid, data } = await res.json();
    if (valid) {
      setTweetList(data);
    }
  }
  async function createTweet() {
    const content = prompt("New Tweet");
    if (!content) {
      return;
    }
    const { id: userId, username } = globalState.userInfo as User;
    await fetch("/api/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        userId,
        username, // todo: may get from server session
      }),
    });
    getTweets();
  }
  async function deleteTweet(tId: string) {}
  async function logout() {
    const yes = confirm("Are you sure?");
    if (yes) {
      dispatch({ userInfo: "" });
      localStorage.setItem(CONST.USER_INFO, "");
      router.push("/signup");
    }
  }
  if (tweetList?.length) {
    return (
      <div className="min-h-screen">
        <h1 className="text-center text-2xl p-4">My Timeline Page</h1>
        <ul className="p-4">
          {tweetList.map((_) => {
            return (
              <li key={_.id} className="h-24 border-b-2 mb-4">
                <div className="flex h-full">
                  <div className="w-12 h-12 rounded-3xl bg-slate-400 flex justify-center items-center">
                    {_.username[0]}
                  </div>
                  <div className="flex flex-col flex-1 ml-2 justify-between">
                    <div className="flex justify-between">
                      <div className="text-xl">{_.username}</div>
                      <button
                        className={`text-sm bg-green-300 p-1 rounded ${
                          _.userId === globalState.userInfo?.id ? "" : "hidden"
                        }`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTweet(_.id)}
                        className={`text-sm bg-red-300 p-1 rounded ${
                          _.userId === globalState.userInfo?.id ? "" : "hidden"
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                    <Link href={`/tweet/${_.id}`} className="mt-2">
                      {_.content}
                    </Link>
                    <div className="text-sm text-gray-400">
                      {d(_.createTime).format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="fixed bottom-4 flex justify-between w-full p-8">
          <div
            onClick={logout}
            className="text-blue-50 rounded flex justify-center items-center w-14 h-14 bg-red-400"
          >
            Logout
          </div>
          <div
            onClick={createTweet}
            className="text-blue-50 rounded flex justify-center items-center bg-blue-300 w-14 h-14"
          >
            Post
          </div>
        </div>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
}

export default TimeLine;
