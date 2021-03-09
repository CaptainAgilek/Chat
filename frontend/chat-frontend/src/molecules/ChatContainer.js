import React, { useState } from "react";
import { ChatInputBox } from "../molecules/ChatInputBox";
import { ChatWrapper } from "../molecules/ChatWrapper";
import { sendMessageToRoom } from "../lib/Socket";

export function ChatContainer({ name, messages, setMessages, users }) {
  const [msg, setMsg] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    sendMessageToRoom(msg, setMessages, name);
    setMsg(null);
    document.getElementById("msgInput").value = "";
  }

  return (
    <div className="chat-container">
      <ChatWrapper messages={messages} users={users} />
      <ChatInputBox name={name} handleSubmit={handleSubmit} setMsg={setMsg} />
    </div>
  );
}
