import React from "react";
import { UserRow } from "../atoms/UserRow";

export function UsersCol({ users }) {
  return (
    <div className="users-col">
      {users && users.map((user) => <UserRow key={user}>{user}</UserRow>)}
    </div>
  );
}
