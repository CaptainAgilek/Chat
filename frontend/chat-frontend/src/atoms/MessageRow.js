import React from "react";

export function MessageRow({ message }) {
  return (
    <div
      className="message-row"
      style={{ color: message.sender === "Server" && "dodgerblue" }}
    >
      {message.sender + ": " + message.msg}
    </div>
  );
}
