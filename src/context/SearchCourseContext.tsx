"use client";
import React, { createContext, useContext, useState } from "react";

const SearchCourse = createContext<any>(0);

const SearchCourseContext = ({ children }: any) => {
  const [searchData, setsearchData] = useState();
  const [loader, setLoader] = useState(false);
  return (
    <SearchCourse.Provider
      value={{
        searchData,
        setsearchData,
        loader,
        setLoader,
      }}
    >
      {children}
    </SearchCourse.Provider>
  );
};

export const useSearchContext = () => useContext(SearchCourse);

export default SearchCourseContext;
