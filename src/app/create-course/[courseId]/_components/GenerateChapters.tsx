import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Chapters from "./Chapters";
import { GenerateChapterContent } from "@/config/aiModel";
import { db } from "@/config/db";
import { CourseChapters, courseList } from "@/config/schema";
import { getVideo } from "@/helper/services";
import { useRouter } from "next/navigation";

const GenerateChapters = ({ course }: any) => {
  const [data, setData] = useState<any[]>([]);
  const parsedCourseOutput = JSON.parse(course?.courseOutput);
  const [generateChaptersLoading, setgenerateChaptersLoading] = useState(false);
  const router = useRouter();

  const handleCourseGenerateChapters = async () => {
    try {
      setgenerateChaptersLoading(true);
      const chaptersData = parsedCourseOutput?.chapters?.map(
        async (item: any, index: any) => {
          let result;
          const PROMT = `Explain the concept in detail on topic:${course?.name},Chapter ${item?.chapterName} in JSON format with list of array with field as a title,
          description in detail code Example ( code field in <precode> format) if applicable `;
          //   console.log(PROMT);
          result = await GenerateChapterContent.sendMessage(PROMT);
          console.log("The chapter ai result is ", result?.response?.text());
          try {
            const chaptersResponse = await db.insert(CourseChapters).values({
              courseId: course?.courseId,
              chapterId: index,
              content: JSON.parse(result?.response?.text()),
              videoId: getVideo(),
            });
            console.log("The data at last is ....", chaptersResponse);
            setgenerateChaptersLoading(false);
            await db.update(courseList).set({
              publish: true,
            });

            router.replace("/dashboard");
          } catch (error) {
            console.log("The error while saving all related chapter data ...");
          } finally {
            setgenerateChaptersLoading(false);
          }
        }
      );
      setData(chaptersData || []);
    } catch (error) {
      console.error("Failed to generate chapters:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* {JSON.stringify(data)} */}
      <Button
        className="dark:text-white"
        onClick={handleCourseGenerateChapters}
        disabled={generateChaptersLoading}
      >
        {generateChaptersLoading && (
          <div className="w-6 h-6 animate-spin transition-all rounded-full mr-2 duration-500 spinner  border-white dark:border-white border-2"></div>
        )}
        {generateChaptersLoading ? "Generating Chapters" : "Generate Chapters"}
      </Button>
    </div>
  );
};

export default GenerateChapters;
