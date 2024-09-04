"use client";
import { Button } from "@/components/ui/button";
import { useUserCourseListContext } from "@/context/UserCourseListContext";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const AddCourse = () => {
  const { isLoaded, isSignedIn, user: authUser } = useUser();
  const { userCourseList: globalUserCourseList, setuserCourseList } =
    useUserCourseListContext();

  return (
    <div className="flex justify-between  items-center">
      <div>
        <h1 className="text-2xl font-bold">
          Hello ,{!isLoaded && "loading"}
          {authUser?.fullName}
        </h1>
        <p className="text-sm my-1 italic">
          Create new Course with AI,share it and Earn{" "}
        </p>
      </div>
      {globalUserCourseList.length >= 5 ? (
        <Link href={"/dashboard/upgrade"}>
          <Button className="p-3 dark:text-white" size={"lg"}>
            Upgrade
          </Button>
        </Link>
      ) : (
        <Link href={"/create-course"}>
          <Button className="p-3 dark:text-white" size={"lg"}>
            Add New Course
          </Button>
        </Link>
      )}
    </div>
  );
};

export default AddCourse;
