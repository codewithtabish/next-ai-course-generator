import Chapters from "@/app/create-course/[courseId]/_components/Chapters";
import { db } from "@/config/db";
import { CourseChapters, courseList } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

const CourseContent = ({ course, selectedChapter, selectedItem }: any) => {
  const [chapterContent, setchapterContent] = useState<any>();
  const [error, seterror] = useState<any>();

  useEffect(() => {
    getSingleChapterContent();

    return () => {};
  }, [course, selectedChapter, selectedItem]);

  const getSingleChapterContent = async () => {
    try {
      const response = await db
        .select()
        .from(CourseChapters)
        .where(
          and(
            eq(CourseChapters?.courseId, course?.courseId),
            eq(CourseChapters?.chapterId, selectedChapter)
          )
        );
      console.log("The start data here is ", response);
      setchapterContent(response[0]);
    } catch (error) {
      console.log("The error is", error);
      seterror(error);
    }
  };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="pr-5 py-2 overflow-x-hidden">
      {/* {JSON.stringify(chapterContent?.content[0])} */}
      <div>
        <h1 className="text-2xl font-bold">{selectedItem?.chapterName}</h1>
        <p className="dark:text-gray-300 py-3">{selectedItem?.about}</p>
      </div>
      <div className="flex justify-center my-6">
        <YouTube videoId={chapterContent?.videoId} opts={opts} />
      </div>
      <div className="flex flex-col gap-3">
        {chapterContent?.content?.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className="space-y-3 border border-gray-300 rounded-md my-3 p-10"
            >
              <h3 className="text-xl font-bold">{item?.title}</h3>
              <p className="whitespace-pre-wrap">{item?.description}</p>
              {item?.code && (
                <div className="bg-black text-white p-5 dark:bg-gray-700 rounded-md">
                  <pre>
                    <code>{item?.code}</code>
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseContent;
