"use client";

import React, { useEffect, useState, useCallback } from "react";
import { db } from "@/config/db";
import { courseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import ChapterList from "./_components/ChapterList";
import CourseContent from "./_components/CourseContent";
import { BarLoader } from "react-spinners";

const Page = ({ params }: any) => {
  const [course, setCourse] = useState<any>();
  const [selectedChapter, setSelectedChapter] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<any>();

  // Memoize getSingleCourse to ensure it doesn't change on every render
  const getSingleCourse = useCallback(async () => {
    try {
      const result = await db
        .select()
        .from(courseList)
        .where(eq(courseList?.courseId, params.courseId));
      console.log("Here data is ", result);
      setCourse(result[0]);
    } catch (error) {
      console.log("The error while getting the single course is ", error);
    }
  }, [params.courseId]); // Include params.courseId in dependencies

  useEffect(() => {
    getSingleCourse();
  }, [getSingleCourse]); // Use the memoized function here

  if (!course) {
    return (
      <div className="flex justify-center items-center py-10">
        <BarLoader className="mb-4" width={"60%"} color="#36d7b7" />
      </div>
    );
  }

  const handleSelectChapter = (chapter: any, item: any) => {
    setSelectedChapter(chapter);
    setSelectedItem(item);
  };

  return (
    <>
      <div className="grid md:grid-cols-12 gap-5">
        <div className="grid col-span-4 p-10">
          {course && (
            <ChapterList
              course={course}
              onSelectChapter={handleSelectChapter}
            />
          )}
        </div>
        <div className="grid col-span-8 p-5">
          <CourseContent
            course={course}
            selectedChapter={selectedChapter}
            selectedItem={selectedItem}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
