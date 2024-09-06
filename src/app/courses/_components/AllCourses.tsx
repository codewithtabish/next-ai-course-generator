"use client";

import { courseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq, lte } from "drizzle-orm";
import React, { useState, useEffect, useCallback } from "react";
import { useUserCourseListContext } from "@/context/UserCourseListContext";
import { db } from "@/config/db";
import CourseCard from "@/app/dashboard/_components/CourseCard";
import { useSearchContext } from "@/context/SearchCourseContext";
import CustomLaoder from "@/components/custom/CustomLaoder";

const AllCourses = () => {
  const { isLoaded, isSignedIn, user: authUser } = useUser();
  const [userCourseList, setCourseList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { searchData, setsearchData, loader, setLoader } = useSearchContext();

  // Memoize getAllUserCourses to ensure it doesn't change on every render
  const getAllUserCourses = useCallback(async () => {
    setLoader(true);
    try {
      let query: any = db.select().from(courseList);

      // Add conditions dynamically based on search params
      if (searchData) {
        const conditions = [];

        if (searchData.course) {
          conditions.push(eq(courseList.category, searchData.course));
        }
        if (searchData.level) {
          conditions.push(eq(courseList.level, searchData.level));
        }
        if (searchData.price) {
          conditions.push(lte(courseList.price, searchData.price));
        }

        if (conditions.length > 0) {
          query = query.where(and(...conditions));
        }
      }

      const result = await query;
      setCourseList(result);
    } catch (error) {
      console.error("Failed to fetch user courses:", error);
    } finally {
      setLoading(false);
      setLoader(false);
    }
  }, [searchData, setLoader]); // Include searchData and setLoader in dependencies

  useEffect(() => {
    if (isLoaded) {
      getAllUserCourses();
    }
  }, [isLoaded, getAllUserCourses]); // Use memoized function here

  if (loading || !isLoaded || loader) {
    return <CustomLaoder />;
  }

  return (
    <div className="max-w-6xl mx-auto mt-16 mb-16">
      <h1 className="text-2xl font-bold py-6">Courses</h1>
      <div className="grid md:grid-cols-3 gap-5">
        {userCourseList.length > 0 ? (
          userCourseList.map((item, index) => (
            <div key={index}>
              <CourseCard
                fromHome={true}
                course={item}
                refreshData={() => getAllUserCourses()}
              />
            </div>
          ))
        ) : (
          <div>
            <p>NO DATA FOUND </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
