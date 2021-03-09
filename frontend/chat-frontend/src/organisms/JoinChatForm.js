import React from "react";
import { createSocket, ROOM } from "../lib/Socket";

export function JoinChatForm({
  name,
  setName,
  setJoined,
  messages,
  setMessages,
  setUsers,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    createSocket(name, ROOM, setJoined, setMessages, setUsers);
  }

  return (
    <div className="flex-container">
      <img src="logo.PNG" />
      <form onSubmit={handleSubmit}>
        <label className="name-label">
          <span className="name-label">Name:</span>
          <input
            type="text"
            name="name"
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <input type="submit" value="Join Chat" />
      </form>
    </div>
  );
}
