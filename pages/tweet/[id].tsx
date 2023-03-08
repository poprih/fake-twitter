import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { Tweet } from "@/type";
import d from "dayjs";

export default function TweetDetail() {
  const router = useRouter();
  const [data, setData] = useState<Tweet | null>(null);
  useEffect(() => {
    if (router.query.id) {
      fetch(`/api/tweet?id=${router.query.id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.valid) {
            setData(res.data);
          }
        });
    }
  }, [router.query.id]);
  return (
    <div className="p-4">
      <h1 className="text-xl text-center">Tweet Detail</h1>
      <div>
        <span className="text-xl text-cyan-300">creator: </span>
        <span className="break-words">{data?.username}</span>
      </div>
      <div>
        <span className="text-xl text-cyan-300">content: </span>
        <span className="break-words">{data?.content}</span>
      </div>
      <div>
        <span className="text-xl text-cyan-300">create time: </span>
        <span className="break-words">
          {data && d(data.createTime).format("YYYY-MM-DD HH:mm:ss")}
        </span>
      </div>
    </div>
  );
}
