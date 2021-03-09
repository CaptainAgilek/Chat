import React, { useState } from "react";
import { JoinChatForm } from "../organisms/JoinChatForm";
import { ChatContainer } from "../organisms/ChatContainer";

export function ChatTemplate() {
  const [joined, setJoined] = useState(false); // did user join chat?
  const [name, setName] = useState(null); //user's name
  const [messages, setMessages] = useState([]); //messages(includes old msgs) in room
  const [users, setUsers] = useState([]); //users in room

  return (
    <div>
      {joined && (
        <ChatContainer
          name={name}
          messages={messages}
          setMessages={setMessages}
          users={users}
        />
      )}
      {!joined && (
        <JoinChatForm
          name={name}
          setName={setName}
          setJoined={setJoined}
          setMessages={setMessages}
          setUsers={setUsers}
        />
      )}
    </div>
  );
}
