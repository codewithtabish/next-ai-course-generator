"use client";
import { courseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useState, useEffect } from "react";
import { useUserCourseListContext } from "@/context/UserCourseListContext";
import { BarLoader } from "react-spinners";
import { db } from "@/config/db";
import CourseCard from "@/app/dashboard/_components/CourseCard";

const RecommendedCourseList = () => {
  const { isLoaded, isSignedIn, user: authUser } = useUser();
  const [userCourseList, setCourseList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { userCourseList: globalUserCourseList, setuserCourseList } =
    useUserCourseListContext();

  const getAllUserCourses = async () => {
    try {
      const result = await db.select().from(courseList);
      //   @ts-ignore
      setCourseList(result);
      setuserCourseList(result);
    } catch (error) {
      console.error("Failed to fetch user courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      getAllUserCourses();
    }
  }, [isLoaded]);

  if (loading || !isLoaded) {
    return (
      <div className="flex justify-center items-center py-10">
        <BarLoader className="mb-4" width={"60%"} color="#36d7b7" />
      </div>
    );
  }

  // if (!isSignedIn) {
  //   return <p>You must be signed in to view your courses.</p>;
  // }

  return (
    <div className="max-w-6xl mx-auto mt-20 mb-20 ">
      <h1 className="text-2xl font-bold py-6 ">Recommended Courses</h1>
      <div className="grid md:grid-cols-3 gap-5">
        {userCourseList?.map((item, index) => {
          return (
            <div key={index}>
              <CourseCard
                fromHome={true}
                course={item}
                key={index}
                refreshData={() => getAllUserCourses()}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedCourseList;
