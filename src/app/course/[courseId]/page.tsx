"use client";
import Chapters from "@/app/create-course/[courseId]/_components/Chapters";
import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import CourseDetail from "@/app/create-course/[courseId]/_components/courseDetail";
import CustomLaoder from "@/components/custom/CustomLaoder";
import AppHeader from "@/components/custom/Header";
import { db } from "@/config/db";
import { courseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState, useCallback } from "react";
// @ts-ignore

const Page = ({ params }: any) => {
  const [course, setCourse] = useState<any>();
  const [loading, setLoading] = useState(true); // Added loading state

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
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  }, [params.courseId]); // Dependency added

  useEffect(() => {
    getSingleCourse();
  }, [getSingleCourse]); // Dependency updated

  if (loading) {
    return <CustomLaoder />; // Display loader while fetching
  }

  return (
    <div>
      <div className="py-16 md:px-12 max-w-6xl mx-auto">
        <h1 className="font-bold text-3xl text-center">View Course</h1>
        {course && <CourseBasicInfo course={course} fromViewCourse={true} />}

        {course ? (
          <div>
            <CourseDetail course={course} />
            <Chapters course={course} />
          </div>
        ) : (
          <CustomLaoder />
        )}

        {/* <GenerateChapters course={course} /> */}
      </div>
    </div>
  );
};

export default Page;
