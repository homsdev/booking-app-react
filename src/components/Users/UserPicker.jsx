import { useState, useEffect, useContext } from "react";
import UserContext, { UserSetContext } from "./UserContext";

export const UserPicker = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useContext(UserContext);
  const setUser = useContext(UserSetContext);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/users");
      const data = await response.json();

      if (data) {
        setUsers(data);
        setUser(data[0]);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [setUser]);

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
