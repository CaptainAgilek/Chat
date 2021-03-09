import React from "react";
import { MessageRow } from "../atoms/MessageRow";
export function MessageBox({ messages }) {
  return (
    <div className="message-box">
      {messages &&
        messages.map((message, index) => (
          <MessageRow key={index} message={message} />
        ))}
    </div>
  );
}
