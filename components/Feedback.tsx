import React from "react";

type INFO = {
  msg: string;
  type: "error" | "success" | "warning";
};

function Message(props: INFO | string) {
  return typeof props === "string" ? (
    <div className="absolute">{props}</div>
  ) : (
    <div>{props.msg}</div>
  );
}

export { Message };
