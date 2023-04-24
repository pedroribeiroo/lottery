import axios from "axios";
import { createContext, useState, useEffect, useCallback } from "react";

export const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const users = useCallback(async () => {
    try {
      axios
        .get("http://localhost:3001/users/643b02fb307fce042922e794")
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    users();
  }, []);

  return (
    <UserContext.Provider value={{ user, users }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
