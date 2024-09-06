"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/config/db";
import { BlogComment, BlogPost } from "@/config/schema";
import { generateBlogComments } from "@/helper/fackerUtil";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { Eye, ThumbsUp, ThumbsDown, Trash } from "lucide-react"; // Use thumbs up and down icons
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { FaVolumeUp } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import DeleteDialouge from "./_components/DeleteDialouge";

const SingleBlog = ({ params }: any) => {
  const { blogId } = params;
  const [result, setResult] = useState<any>();
  const { isLoaded, isSignedIn, user: authUser } = useUser();
  const [hasLiked, setHasLiked] = useState(false);
  const [comment, setComment] = useState<any>("");
  const [loader, setLoader] = useState(false);
  const [comments, setComments] = useState<any>([]);
  const [commentLoader, setCommentLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  const getSingleBlog = useCallback(async () => {
    setLoader(true);
    const blogData = await db
      .select()
      .from(BlogPost)
      .where(eq(BlogPost.id, blogId));
    const blog = blogData[0];

    if (blog) {
      const userEmail = authUser?.primaryEmailAddress?.emailAddress;

      if (userEmail) {
        // @ts-ignore
        setHasLiked(blog.likeUserIds?.includes(userEmail));
        if (!blog.viewUserIds?.includes(userEmail)) {
          // @ts-ignore

          blog.views += 1;
          // @ts-ignore

          blog.viewUserIds = [...blog.viewUserIds, userEmail];

          const updateResult = await db
            .update(BlogPost)
            .set({
              views: blog.views,
              viewUserIds: blog.viewUserIds,
            })
            .where(eq(BlogPost.id, blogId))
            .returning();

          setResult(updateResult[0]);
          setLoader(false);
        } else {
          setResult(blog);
          setLoader(false);
        }
      }
    }
  }, [authUser, blogId]);

  const getAllReviews = useCallback(async () => {
    try {
      setLoader(true);
      const response = await db
        .select()
        .from(BlogComment)
        .where(eq(BlogComment.postId, blogId));
      setComments(response);
      console.log("The all reviews are ", response);
    } catch (error) {
      console.log("The all reviews error are ", error);
    } finally {
      setLoader(false);
    }
  }, [blogId]);

  // Fetch the single blog post and reviews when `isLoaded` changes
  useEffect(() => {
    if (isLoaded) {
      getSingleBlog();
      getAllReviews();
    }
  }, [isLoaded, getSingleBlog, getAllReviews]);

  // Fetch comments whenever `commentLoader` changes
  useEffect(() => {
    if (commentLoader) {
      getAllReviews();
    }
  }, [commentLoader, getAllReviews]);

  const handleLikeAndRemoveLike = async () => {
    if (!result) return;

    const userEmail = authUser?.primaryEmailAddress?.emailAddress;

    if (!userEmail) return;

    if (hasLiked) {
      const updatedLikes = result.likes - 1;
      const updatedLikeUserIds = result.likeUserIds.filter(
        (email: string) => email !== userEmail
      );

      const updateResult = await db
        .update(BlogPost)
        .set({
          likes: updatedLikes,
          likeUserIds: updatedLikeUserIds,
        })
        .where(eq(BlogPost.id, result.id))
        .returning();

      setResult(updateResult[0]);
      setHasLiked(false);
    } else {
      const updatedLikes = result.likes + 1;
      const updatedLikeUserIds = [...result.likeUserIds, userEmail];

      const updateResult = await db
        .update(BlogPost)
        .set({
          likes: updatedLikes,
          likeUserIds: updatedLikeUserIds,
        })
        .where(eq(BlogPost.id, result.id))
        .returning();

      setResult(updateResult[0]);
      setHasLiked(true);
    }
  };

  const postComment = async () => {
    try {
      setCommentLoader(true);

      const response = await db
        .insert(BlogComment)
        .values({
          // @ts-ignore
          commenterName: authUser?.fullName,
          postId: blogId,
          comment: comment,
          imageUrl: authUser?.imageUrl,
          commentedBy: authUser?.primaryEmailAddress?.emailAddress,
        })
        .returning();

      if (response.length > 0) {
        console.log("The post response is ", response[0]);
      }
      setCommentLoader(false);
      setComment("");
    } catch (error) {
      console.error("The post comment error is ", error);
      setCommentLoader(false);
    }
  };

  const deleteReview = async (id: any) => {
    try {
      setDeleteLoader(true);
      const deleteResponse = await db
        .delete(BlogComment)
        .where(eq(BlogComment.id, id));
      if (deleteResponse) {
        setDeleteLoader(false);
        getAllReviews();
      }
    } catch (error) {
      setDeleteLoader(false);
      console.log("Deleting review error is ", error);
    }
  };

  if (!isLoaded || loader) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-6 h-6 animate-spin transition-all rounded-md duration-500 spinner border-gray-800 dark:border-gray-50 border-2"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12">
      <div>
        <Image
          src={result?.coverImageUrl}
          width={300}
          height={300}
          className="w-full min-h-[350px] max-h-[350px] rounded-lg"
          alt={result?.title}
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold pt-4 text-center">
            {result?.title}
          </h1>
          <span className="text-sm font-bold text-gray-400">
            {result?.postedOn?.toLocaleDateString()}
          </span>
        </div>
        <div className="flex gap-5 items-center mr-5 flex-row-reverse">
          <div className="flex flex-row gap-2 mr-4">
            <Eye />
            <span className="text-sm font-bold text-gray-400">
              {result?.views}
            </span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            {hasLiked ? (
              <SlLike
                className="flex cursor-pointer text-red-500"
                onClick={handleLikeAndRemoveLike}
              />
            ) : (
              <SlLike
                className="flex cursor-pointer text-gray-500"
                onClick={handleLikeAndRemoveLike}
              />
            )}
            <span>{result?.likes}</span>
          </div>
        </div>
      </div>
      {/* TAGS  */}
      <div className="flex justify-end items-center gap-5 my-5 ">
        {result?.tags.map((item: any, index: any) => {
          return (
            <div key={index} className="cursor-pointer">
              <Badge>{item}</Badge>
            </div>
          );
        })}
      </div>
      <div className="my-6">
        <div
          dangerouslySetInnerHTML={{ __html: result?.content }}
          className="dark:md:text-gray-200 text-gray-800 text-[18px] text-justify leading-10"
        />
      </div>
      <div>
        <hr />
      </div>
      <div className="my-2">
        <h2 className="font-bold text-2xl py-2 relative inline-block">
          Reviews
          <span className="block border-t-2 border-gray-400 w-full mt-1"></span>
          <span className="block border-t-2 border-gray-400 w-full mt-1"></span>
        </h2>

        <div className=" my-10 grid md:grid-cols-12 max-h-[30vh] gap-8 items-center">
          <div className="grid col-span-5">
            <Textarea
              className=""
              rows={5}
              value={comment}
              onChange={(e: any) => setComment(e.target.value)}
            />
            <Button
              className="mt-2"
              onClick={postComment}
              disabled={commentLoader}
            >
              {loader ? "Submiting" : "Submit"}
            </Button>
          </div>
          {comments?.length > 0 ? (
            <div className="max-h-[30vh] overflow-y-scroll flex-1 grid col-span-7 ">
              {comments?.map((item: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="shadow-md px-4 py-2 border-b-2 border-b-gray-200 dark:border-b-gray-700 "
                  >
                    <div className="flex flex-row gap-2 items-center">
                      <Image
                        src={item?.imageUrl}
                        width={50}
                        height={50}
                        object-cover
                        alt="avatr image"
                        className=" rounded-full"
                      />
                      <h2>{item?.commenterName}</h2>
                    </div>
                    <div className="mt-3 pl-12">
                      <p className="text-sm dark:text-gray-200 text-gray-600">
                        {item?.comment}
                      </p>
                      {item?.commentedBy ==
                        authUser?.primaryEmailAddress?.emailAddress && (
                        <div className="py-1 flex justify-end ">
                          <DeleteDialouge
                            delteReview={() => deleteReview(item?.id)}
                            // deleteLoader={deleteLoader}
                          >
                            <Trash className="text-red-400 cursor-pointer" />
                          </DeleteDialouge>
                        </div>
                      )}

                      <span className="block text-right text-gray-500 text-[11px] font-bold mt-2">
                        {item?.commentedOn
                          ? new Date(item.commentedOn).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : "Date not available"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="  grid col-span-7">
              <p className="text-center font-bold text-sm">
                No Review found 💞💞
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
