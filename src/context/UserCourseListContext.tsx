"use client";
import React, { createContext, useContext, useState } from "react";

const UserCourseContext = createContext<any>(0);

const UserCourseListContext = ({ children }: any) => {
  const [userCourseList, setuserCourseList] = useState(0);
  return (
    <UserCourseContext.Provider
      value={{
        userCourseList,
        setuserCourseList,
      }}
    >
      {children}
    </UserCourseContext.Provider>
  );
};

export const useUserCourseListContext = () => useContext(UserCourseContext);

export default UserCourseListContext;
