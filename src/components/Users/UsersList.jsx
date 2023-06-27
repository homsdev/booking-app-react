import { useEffect, useState } from "react";

import useFetch from "../../utils/useFetch";

export const UsersList = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const {
    data,
    status,
    error: userError,
  } = useFetch("http://localhost:3001/users");
  
  useEffect(() => {
    setUsers(data);
    if (status === "success") setIsLoading(false);
    setError(userError);
  }, [data, status, userError]);
  
  if (error) {
    return <p>Oops: {error.message}</p>;
  }
  
  console.log("componente redibujado");
  return (
    <>
      <ul className="items-list-nav">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          users.map((u, i) => (
            <li
              key={i}
              className={u.id === selectedUser?.id ? "selected" : null}
            >
              <button onClick={() => setSelectedUser(u)} className="btn">
                {u.name}
              </button>
            </li>
          ))
        )}
      </ul>
    </>
  );
};
