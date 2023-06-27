import { createContext, useState } from "react";

const UserContext = createContext();
export default UserContext;

export const UserSetContext = createContext();

/**
 * This aproach avoids unnecesary Re-renders
 * Custom Provider component manages itself the state
 * @param {*} children React wrapped components by custom provider
 * @returns
 */
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={user}>
      <UserSetContext.Provider value={setUser}>
        {children}
      </UserSetContext.Provider>
    </UserContext.Provider>
  );
}
