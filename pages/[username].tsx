import { useEffect, useState, Dispatch } from "react";
import Link from "next/link";
import type { Tweet, GlobalState, User } from "@/type";
import { useGlobal, useGlobalDispatch } from "@/context";
import { useRouter } from "next/router";
import CONST from "@/const";
import d from "dayjs";
import { useInView } from "react-cool-inview";

function TimeLine() {
  const [tweetList, setTweetList] = useState<Tweet[] | []>([]);
  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(0);
  const dispatch = useGlobalDispatch() as Dispatch<{}>;
  const globalState: GlobalState = useGlobal();
  const router = useRouter();
  useEffect(() => {
    getTweets(pageNo !== 1);
    return () => {};
  }, [pageNo]);
  async function getTweets(loadMore?: boolean) {
    const res = await fetch(`/api/tweet/list?pageNo=${pageNo}`, {
      method: "GET",
    });
    const {
      valid,
      data,
      total,
    }: { valid: boolean; data?: Tweet[]; total?: number } = await res.json();
    if (valid) {
      setTotal(total as number);
      !loadMore
        ? setTweetList(data as Tweet[])
        : setTweetList([...tweetList, ...(data as Tweet[])]);
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
    pageNo === 1 ? getTweets(false) : setPageNo(1);
    window.scrollTo(0, 0);
  }
  async function deleteTweet(tId: string) {
    const yes = confirm("Are you sure?");
    if (yes) {
      const res = await fetch("/api/tweet", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: tId }),
      });
      const { valid } = await res.json();
      if (valid) {
        const newList = tweetList.filter((_) => _.id !== tId);
        setTotal(total - 1);
        setTweetList(newList);
      }
    }
  }
  async function editTweet(oldTweet: Tweet) {
    const { content, id } = oldTweet;
    const newContent = prompt("Edit Tweet", content);
    if (!newContent) {
      return;
    }
    const res = await fetch("/api/tweet", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newContent,
        id,
      }),
    });
    const { valid } = await res.json();
    if (valid) {
      const newList = tweetList.map((_) => {
        if (_.id === id) {
          return {
            ..._,
            content: newContent,
          };
        }
        return { ..._ };
      });
      setTweetList(newList);
    }
  }
  async function logout() {
    const yes = confirm("Are you sure?");
    if (yes) {
      dispatch({ userInfo: "" });
      localStorage.setItem(CONST.USER_INFO, "");
      router.push("/signup");
    }
  }
  const { observe } = useInView({
    rootMargin: "50px 0px",
    onEnter: ({ unobserve }) => {
      setPageNo(pageNo + 1);
      unobserve();
    },
  });
  if (tweetList?.length) {
    return (
      <>
        <h1 className="p-4 text-2xl text-center">My Timeline Page</h1>
        <ul className="flex flex-wrap w-screen p-4">
          {tweetList.map((_, idx) => {
            return (
              <li
                key={_.id}
                className="border-b-2 mb-4 md:w-[50%] w-full pb-2"
                ref={idx === tweetList.length - 1 ? observe : null}
              >
                <div className="flex h-full">
                  <div className="flex items-center justify-center w-12 h-12 text-2xl text-white bg-black dark:bg-white dark:text-black rounded-3xl">
                    {_.username[0]}
                  </div>
                  <div className="flex flex-col justify-between flex-1 ml-2">
                    <div className="text-xl">{_.username}</div>
                    <Link
                      href={`/tweet/${_.id}`}
                      className="my-2 overflow-hidden break-all text-ellipsis line-clamp-3"
                    >
                      {_.content}
                    </Link>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">
                        {d(_.createTime).format("YYYY-MM-DD HH:mm:ss")}
                      </span>
                      <button
                        className={`text-sm bg-green-300 px-1 rounded ${
                          _.userId === globalState.userInfo?.id ? "" : "hidden"
                        }`}
                        onClick={() => editTweet(_)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTweet(_.id)}
                        className={`text-sm bg-red-300 px-1 rounded ${
                          _.userId === globalState.userInfo?.id ? "" : "hidden"
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {total === tweetList.length && (
          <div className="text-center">no more data</div>
        )}
        <div className="fixed flex justify-between w-full p-8 bottom-4">
          <div
            onClick={logout}
            className="flex items-center justify-center bg-red-400 rounded text-blue-50 w-14 h-14"
          >
            Logout
          </div>
          <div
            onClick={createTweet}
            className="flex items-center justify-center bg-blue-300 rounded text-blue-50 w-14 h-14"
          >
            Post
          </div>
        </div>
      </>
    );
  } else {
    return <div>loading...</div>;
  }
}

export default TimeLine;
