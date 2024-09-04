"use client";
import React, { createContext, useState, useEffect } from "react";

const UserInputContext = createContext<any>(0);

const UserInputContextProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<any>();
  useEffect(() => {
    console.log(userData);
    return () => {};
  }, [userData]);

  return (
    <UserInputContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserInputContext.Provider>
  );
};

export const useUserInputContext = () => React.useContext(UserInputContext);

export default UserInputContextProvider;
