import React from "react";
import { createSocket, ROOM } from "../Socket";

export function JoinChatForm({ name, setName, setJoined, messages, setMessages, setUsers }) {

  function handleSubmit(event) {
    event.preventDefault();
    createSocket(name, ROOM, setJoined, setMessages, setUsers);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
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
