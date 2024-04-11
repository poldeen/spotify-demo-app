import React, { useContext, useState } from "react";

const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
