"use client";
import { db } from "@/config/db";
import { courseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useState, useEffect, useCallback } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import FinishScreenBasicInfo from "./_components/FinishScreenBasicInfo";
import { HighlighterIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import CustomLaoder from "@/components/custom/CustomLaoder";

const FinishScreen = ({ params }: any) => {
  const { courseId } = params;
  const { user, isLoaded } = useUser();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Memoize getCourse to ensure stable function reference
  const getCourse = useCallback(async () => {
    try {
      const response = await db
        .select()
        .from(courseList)
        .where(
          and(
            eq(courseList.courseId, courseId),
            eq(
              courseList.createdBy,
              user?.primaryEmailAddress?.emailAddress || ""
            )
          )
        );
      setCourse(response[0]);
    } catch (err) {
      setError("Failed to load course data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [courseId, user]); // Add dependencies

  useEffect(() => {
    if (params && user) {
      getCourse();
    }
  }, [params, user, getCourse]); // Include getCourse in dependencies

  if (loading || !isLoaded) {
    return <CustomLaoder />;
  }

  if (!course) {
    return <CustomLaoder />;
  }

  return (
    <div>
      <div className="max-w-6xl mx-auto py-12">
        <h1 className="text-3xl font-bold py-6">Finish Course 🔥🔥</h1>
        {course && <FinishScreenBasicInfo course={course} />}
        <div className="my-4">
          <h2 className="text-sm font-bold py-2">Course URL !</h2>
          <div className="flex justify-between items-center px-20">
            <h2 className="text-sm font-bold text-center ">
              {process.env.NEXT_PUBLIC_HOST_NAME +
                "course/view" +
                "/" +
                course?.courseId}
            </h2>
            <HighlighterIcon
              className="ml-7 cursor-pointer"
              onClick={async () => {
                try {
                  const courseUrl = `${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`;
                  await navigator.clipboard.writeText(courseUrl);
                  toast({
                    title: "URL copied!",
                    description: courseUrl,
                  });
                } catch (error) {
                  console.error("Failed to copy URL to clipboard:", error);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishScreen;
