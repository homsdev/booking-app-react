import React, { useState } from "react";
import { UserDetails } from "./UserDetails";

import { UsersList } from "./UsersList";

export const UsersPage = () => {

  const [selectedUser,setSelectedUser]= useState(null);

  return (
    <main className="users-page">
      <UsersList setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
      <UserDetails user={selectedUser} />
    </main>
  );
};
