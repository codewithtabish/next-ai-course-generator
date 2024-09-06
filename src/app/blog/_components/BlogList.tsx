"use client";
import { db } from "@/config/db";
import { BlogPost } from "@/config/schema";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { useUser } from "@clerk/nextjs";
import CustomLaoder from "@/components/custom/CustomLaoder";

const BlogList = () => {
  const [data, setData] = useState<any>();
  const { isLoaded, isSignedIn, user: authUser } = useUser();

  useEffect(() => {
    isLoaded && isSignedIn && getAllBlogs();

    return () => {};
  }, [isLoaded, isSignedIn]);

  const getAllBlogs = async () => {
    const response = await db.select().from(BlogPost);
    setData(response);
  };

  if (!isLoaded || !data) {
    return <CustomLaoder />;
  }

  // return <div>{JSON.stringify(data)}</div>;

  return (
    <div className="py-20 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold py-5 text-center">Blogs</h1>

      {data[0] ? <BlogCard blog={data[0]} firstBlog={true} /> : null}

      <div className="grid md:grid-cols-4 gap-4 items-center">
        {data?.map((item: any, index: any) => {
          return <BlogCard blog={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default BlogList;
