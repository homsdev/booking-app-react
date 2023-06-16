import { useEffect, useState } from "react";

import getData from "../../utils/api";

export const UsersList = ({selectedUser,setSelectedUser}) => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    setIsLoading(true);
    getData("http://localhost:3001/users")
      .then((users) => {
        setUsers(users);
        setSelectedUser(users[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, [setSelectedUser]);

  if(error){
    return <p>Oops: {error.message}</p>
  }

  return (
    <>
      <ul className="items-list-nav">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          users.map((u, i) => (
            <li key={i} className={u.id === selectedUser?.id ? "selected" : null}>
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
