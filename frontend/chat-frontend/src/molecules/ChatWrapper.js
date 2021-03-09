import React from "react";
import { MessageBox } from "../molecules/MessageBox";
import { UsersCol } from "../molecules/UsersCol";

export function ChatWrapper({messages, users}) {
  return (
    <div className="chat-wrapper">
      <MessageBox messages={messages} />
      <UsersCol users={users} />
    </div>
  );
}
