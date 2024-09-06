"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog, firstBlog }: any) => {
  return (
    <Card
      className={`cursor-pointer p-0 dark:bg-gray-900 shadow-sm
    ${firstBlog ? "my-5 max-w-[70%] mx-auto" : "my-1"}`}
    >
      <CardContent className="p-0">
        <Link href={`/blog/${blog.id}`}>
          <Image
            src={
              blog?.coverImageUrl ||
              "https://www.searchenginejournal.com/wp-content/uploads/2019/07/the-essential-guide-to-using-images-legally-online.png"
            }
            width={200}
            height={firstBlog ? 300 : 180}
            alt={blog?.title}
            className={`rounded-md object-fill w-full h-full ${
              firstBlog
                ? "min-h-[190px] max-h-[190px] object-cover"
                : "min-h-[120px] max-h-[130px]"
            }`}
          />
        </Link>
      </CardContent>
      <CardHeader className="px-4 py-2">
        <CardTitle className="leading-7">{blog?.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-sm dark:text-gray-500 text-justify">
            {firstBlog
              ? "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique in ex dolor, porro tenetur odio veniam quae hic, repellat voluptatibus, eligendi omnis cupiditate aliquam debitis distinctio numquam at voluptates dignissimos"
              : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores sequi odio voluptate provident"}
          </p>
        </div>
      </CardContent>
      <CardFooter className="px-4 w-ful flex justify-between items-center">
        <div className="flex flex-row justify-between items-center"></div>
        <p className="text-sm text-pr text-right text-primary font-bold">
          {blog?.author}
        </p>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
