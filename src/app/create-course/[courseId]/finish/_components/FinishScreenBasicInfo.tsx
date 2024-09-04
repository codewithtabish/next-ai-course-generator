import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { TbRibbonHealth } from "react-icons/tb";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import CustomLaoder from "@/components/custom/CustomLaoder";

const FinishScreenBasicInfo = ({ course }: any) => {
  if (!course) {
    <CustomLaoder />;
  }

  const parsedCourseOutput = course?.courseOutput
    ? JSON.parse(course?.courseOutput)
    : {};

  return (
    <div className="my-8 border p-10">
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 flex-col gap-3 flex">
          <h2 className="font-bold dark:text-gray-200 md:max-w-[80%] text-gray-700">
            {parsedCourseOutput?.courseName}
            <span className="mx-3"></span>
          </h2>
          <p className="dark:text-gray-500 text-gray-700">
            {parsedCourseOutput?.description}
          </p>

          {course?.category === "Programming" && (
            <div className="w-10 h-10 flex justify-center items-center bg-secondary rounded-full">
              <TbRibbonHealth className="w-6 h-6 text-white" />
            </div>
          )}
          <Link href={"/dashboard"} className="w-full inline-block">
            <Button className="mt-5 dark:text-white w-full">Start</Button>
          </Link>
        </div>
        <div className="flex-1 relative">
          <Label htmlFor="course-image">
            {course?.courseBanner ? (
              <Image
                src={
                  course?.courseBanner != undefined || null
                    ? course.courseBanner
                    : "/coursseone.jpeg"
                }
                width={300}
                height={300}
                className="w-full rounded-lg object-cover h-[250px]"
                alt="course image"
              />
            ) : (
              <p>No image available</p>
            )}
          </Label>
        </div>
      </div>
    </div>
  );
};

export default FinishScreenBasicInfo;
