import React, { useState } from "react";
import { UserDetails } from "./UserDetails";

import { UsersList } from "./UsersList";
import { useUser } from "./UserContext";

export const UsersPage = () => {
  const [user, setUser] = useState(null);
  const [loggedInUser] = useUser();
  const currentUser = user || loggedInUser;

  return (
    <main className="users-page">
      <UsersList setSelectedUser={setUser} selectedUser={currentUser} />
      <UserDetails user={currentUser} />
    </main>
  );
};
