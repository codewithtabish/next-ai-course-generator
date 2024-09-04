import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { BookOpen, MenuIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DropDownMenu from "./DropDownMenu";
import { db } from "@/config/db";
import { courseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const CourseCard = ({ course, refreshData, fromHome }: any) => {
  const { toast } = useToast();
  const [deleteLoader, setDeleteLoader] = useState(false);

  const { isLoaded, isSignedIn, user: authUser } = useUser();

  const parsedCourseOutput = JSON.parse(course?.courseOutput);

  const handleDeleteCourse = async () => {
    try {
      setDeleteLoader(true);
      const response = await db
        .delete(courseList)
        .where(eq(courseList?.id, course?.id))
        .returning({ id: courseList?.id });
      if (response) {
        refreshData();
        setDeleteLoader(false);

        toast({
          title: `${parsedCourseOutput?.courseName} deleted successfully ...`,
          description: "Course deleted successfully",
        });
      }
    } catch (error) {
      setDeleteLoader(false);
    }
  };

  if (!isLoaded) {
    return null;
  }

  const isCourseCreator =
    authUser?.primaryEmailAddress?.emailAddress === course?.createdBy;
  const hasPurchasedCourse = course?.purchases?.includes(
    authUser?.primaryEmailAddress?.emailAddress
  );

  return (
    <Card className="cursor-pointer p-0 dark:bg-gray-900 shadow-sm">
      <CardContent className="p-0">
        <Link
          href={
            isCourseCreator || hasPurchasedCourse
              ? `/course/${course?.courseId}`
              : `/subscribe/${course?.courseId}`
          }
        >
          <Image
            src={course?.courseBanner || "/courseone.jpeg"}
            width={200}
            height={160}
            alt={course?.courseName}
            className="rounded-md object-fill w-full h-full min-h-[150px] max-h-[150px]"
          />
        </Link>
      </CardContent>
      <CardHeader>
        <CardTitle className="leading-7">
          {parsedCourseOutput?.courseName}
        </CardTitle>
        <div className="flex justify-between items-center">
          <div></div>
          <DropDownMenu
            className="mr-5"
            handleDeleteCourse={handleDeleteCourse}
            deleteLoader={deleteLoader}
          >
            <MenuIcon className="w-6 h-6 text-right" />
          </DropDownMenu>
        </div>
      </CardHeader>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-row gap-2 items-center">
            <BookOpen className="text-primary w-5 h-5" />
            <p className="text-[10px]">
              Chapters {" \t "}
              {"  " + parsedCourseOutput?.noOfChapters}
            </p>
          </div>
          <div>
            <Badge className="dark:text-white">
              {parsedCourseOutput?.level}
            </Badge>
          </div>
          <div>
            {hasPurchasedCourse ? (
              <Badge variant={"outline"}>purchased</Badge>
            ) : !isCourseCreator ? (
              <div className="bg-gray-500 p-3 flex justify-center items-center rounded-full w-8 h-8 border border-red-0">
                <h4 className="text-white">
                  ${course?.price > 0 ? course?.price : "free"}
                </h4>
              </div>
            ) : null}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
