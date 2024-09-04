"use client";
import SideBar from "@/app/dashboard/_components/SideBar";
import { db } from "@/config/db";
import { courseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterList from "./_components/ChapterList";
import CourseContent from "./_components/CourseContent";
import { BarLoader } from "react-spinners";
import AppHeader from "@/components/custom/Header";

const page = ({ params }: any) => {
  const [course, setCourse] = useState<any>();
  const [selectedChapter, setselectedChapter] = useState<any>();
  const [selectedItem, setselectedItem] = useState<any>();

  useEffect(() => {
    getSingleCourse();

    return () => {};
  }, [params]);

  const getSingleCourse = async () => {
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
  };

  if (!course) {
    return (
      <div className="flex justify-center items-center py-10">
        <BarLoader className="mb-4" width={"60%"} color="#36d7b7" />
      </div>
    );
  }
  const getSeletechapter = (chapter: any, item: any) => {
    setselectedChapter(chapter);
    setselectedItem(item);
  };
  return (
    <>
      <div className="grid md:grid-cols-12 gap-5">
        <div className="grid col-span-4 p-10">
          {course && (
            <ChapterList course={course} getSeletechapter={getSeletechapter} />
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

export default page;
