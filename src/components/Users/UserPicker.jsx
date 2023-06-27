import { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import useFetch from "../../utils/useFetch";

export const UserPicker = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useUser();

  const { data: users = [], status } = useFetch("http://localhost:3001/users");

  useEffect(() => {
    setUser(users[0]);
    if (status === "success") setIsLoading(false);
  }, [users, setUser, status]);

  function handleSelect({ target }) {
    const selectedID = parseInt(target.value, 10);
    const selectedUser = users.find((u) => u.id === selectedID);

    setUser(selectedUser);
  }

  return (
    <>
      {isLoading ? (
        <p>_Loading...</p>
      ) : (
        <select
          className="user-picker"
          onChange={handleSelect}
          value={user?.id}
        >
          {users.map((u, i) => (
            <option key={i} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      )}
    </>
  );
};
