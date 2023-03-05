import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { Tweet } from "@/type";

type Props = {
  username: String;
};

function TimeLine({ username }: Props) {
  const [tweetList, setTweetList] = useState<Tweet[] | null>([]);
  const [pageNo, setPageNo] = useState(1);
  useEffect(() => {
    getTweets();
    return () => {};
  }, [pageNo]);
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
    await fetch("/api/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });
    getTweets();
  }
  if (tweetList?.length) {
    return (
      <div className="min-h-screen">
        <ul className="p-4">
          {tweetList.map((_) => {
            return (
              <li key={_.id} className="h-24 border-b-2 mb-4">
                <Link href={`/tweet/${_.id}`}>
                  <div className="flex">
                    <div className="w-12 h-12 rounded-3xl bg-slate-400 flex justify-center items-center">
                      {_.username}
                    </div>
                    <div className="flex flex-col flex-1 ml-2">
                      <div className="text-xl">{_.username}</div>
                      <div className="mt-2">{_.content}</div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div
          onClick={createTweet}
          className="text-blue-50 rounded-3xl fixed flex justify-center items-center bottom-4 right-2 bg-blue-300 w-12 h-12"
        >
          Post
        </div>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
}

export default TimeLine;
