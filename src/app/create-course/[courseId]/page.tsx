"use client";
import { db } from "@/config/db";
import { courseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useState, useEffect } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDeatil from "./_components/courseDetail";
import Chapters from "./_components/Chapters";
import { Button } from "@/components/ui/button";
import GenerateChapters from "./_components/GenerateChapters";
import { BarLoader } from "react-spinners";

interface courseSinglePageLayoutProps {
  params: {
    courseId: string;
  };
}
const CourseSinglePageLayout = ({ params }: courseSinglePageLayoutProps) => {
  const { courseId } = params;
  const { isLoaded, isSignedIn, user: authUser } = useUser();
  const [course, setCourse] = useState<any>();

  useEffect(() => {
    courseId && getSingleCourse();

    return () => {};
  }, [courseId, authUser]);

  const getSingleCourse = async () => {
    try {
      const result = await db
        .select()
        .from(courseList)
        .where(eq(courseList.courseId, courseId));
      console.log("The result in single  is", result);
      setCourse(result[0]);
    } catch (error) {
      console.log("The error while getting single course is ", error);
    }
    console.log("The single course is ", course);
  };

  if (!course) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div>
      <div className="py-12 md:px-12 max-w-6xl mx-auto">
        <h1 className="font-bold text-3xl text-center">Course Layout</h1>
        <CourseBasicInfo course={course} />
        <CourseDeatil course={course} />
        <Chapters course={course} />
        <GenerateChapters course={course} />
      </div>
    </div>
  );
};

export default CourseSinglePageLayout;
