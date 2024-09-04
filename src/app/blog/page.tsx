import BlogContext from "@/context/BlogContext";
import React from "react";
import BlogList from "./_components/BlogList";

const BlogPage = () => {
  return (
    <BlogContext>
      <BlogList />
    </BlogContext>
  );
};

export default BlogPage;
