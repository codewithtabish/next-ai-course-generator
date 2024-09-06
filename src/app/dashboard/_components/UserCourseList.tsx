"use client";
import { db } from "@/config/db";
import { courseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useState, useEffect, useCallback } from "react";
import CourseCard from "./CourseCard";
import { useUserCourseListContext } from "@/context/UserCourseListContext";
import { BarLoader } from "react-spinners";
import CustomLaoder from "@/components/custom/CustomLaoder";

const UserCourseList = () => {
  const { isLoaded, isSignedIn, user: authUser } = useUser();
  const [userCourseList, setCourseList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { userCourseList: globalUserCourseList, setuserCourseList } =
    useUserCourseListContext();

  const getAllUserCourses = useCallback(async () => {
    try {
      if (isSignedIn && authUser) {
        const result = await db.select().from(courseList).where(
          // @ts-ignore
          eq(courseList?.createdBy, authUser?.primaryEmailAddress?.emailAddress)
        );
        setCourseList(result);
        setuserCourseList(result);
      }
    } catch (error) {
      console.error("Failed to fetch user courses:", error);
    } finally {
      setLoading(false);
    }
  }, [isSignedIn, authUser, setuserCourseList]);

  useEffect(() => {
    if (isLoaded) {
      getAllUserCourses();
    }
  }, [isLoaded, getAllUserCourses]);

  if (loading || !isLoaded) {
    return <CustomLaoder />;
  }

  if (!isSignedIn) {
    return <p>You must be signed in to view your courses.</p>;
  }

  return (
    <div>
      {userCourseList.length > 0 ? (
        <div className="grid md:grid-cols-3 my-8 gap-5">
          {userCourseList.map((course: any) => (
            <CourseCard
              key={course?.id}
              course={course}
              refreshData={() => getAllUserCourses()}
            />
          ))}
        </div>
      ) : (
        <p>You have no courses.</p>
      )}
    </div>
  );
};

export default UserCourseList;
