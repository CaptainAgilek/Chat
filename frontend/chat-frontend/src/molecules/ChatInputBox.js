import React from "react";

export function ChatInputBox({ name, handleSubmit, setMsg }) {
  return (
    <div className="chat-input-box text-left">
      <form onSubmit={handleSubmit} autoComplete="off">
        <label style={{ width: "100%", marginBottom: "0" }}>
          <span className="name-label">{name}:</span>
          <input
            type="text"
            name="msgInput"
            id="msgInput"
            style={{ width: "80%" }}
            onChange={(event) =>
              setMsg({ msg: event.target.value, sender: name })
            }
          />
        </label>
      </form>
    </div>
  );
}
