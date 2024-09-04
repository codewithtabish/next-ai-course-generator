"use client";
import React, { createContext, useContext, useState } from "react";

const BlogerContext = createContext<any>(0);

const BlogContext = ({ children }: any) => {
  const [blogData, setBlogData] = useState<any>();
  const [blogDeleter, setBlogDeleter] = useState();
  return (
    <BlogerContext.Provider
      value={{
        blogData,
        setBlogData,
        blogDeleter,
        setBlogDeleter,
      }}
    >
      {children}
    </BlogerContext.Provider>
  );
};
const useBlogContext = () => useContext(BlogerContext);

export default BlogContext;
