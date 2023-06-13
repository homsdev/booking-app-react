import { useEffect, useState } from "react";

import getData from "../../utils/api";

export const UsersList = () => {

  const [users, setUsers] = useState([]);
  const [active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = users[active];

  useEffect(() => {
    setIsLoading(true);
    getData("http://localhost:3001/users")
      .then((users) => {
        setUsers(users);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, []);

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
            <li key={i} className={active === i ? "selected" : null}>
              <button onClick={() => setActive(i)} className="btn">
                {u.name}
              </button>
            </li>
          ))
        )}
      </ul>

      {user && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{user.name}</h2>
            </div>
            <h3>{user.title}</h3>
            <p>{user.notes}</p>
          </div>
        </div>
      )}
    </>
  );
};
