import { useState, useEffect } from "react";

export const UserPicker = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/users");
      const data = await response.json();

      if (data) {
        setUsers(data);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>_Loading...</p>
      ) : (
        <select>
          {users.map((u, i) => (
            <option key={i}>{u.name}</option>
          ))}
        </select>
      )}
    </>
  );
};
