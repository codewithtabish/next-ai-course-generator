import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegClock, FaListUl, FaRegEye, FaLevelUpAlt } from "react-icons/fa"; // Importing appropriate icons
import { BarLoader } from "react-spinners";
import CustomLaoder from "@/components/custom/CustomLaoder";

const Chapters = ({ course }: any) => {
  if (!course) {
    <CustomLaoder />;
  }
  const parsedCourseOutput = JSON.parse(course?.courseOutput);

  return (
    <div className="my-8">
      <div>
        {parsedCourseOutput?.chapters?.map((item: any, index: any) => {
          return (
            <Card key={index} className="my-4 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="mb-2 dark:text-gray-400 font-bold text-gray-800">
                  {item?.chapterName}
                </CardTitle>
                <CardDescription className="my-3 dark:text-gray-400 text-gray-700">
                  {item?.about}
                </CardDescription>
              </CardHeader>
              <CardContent className="m-1 flex justify-between items-center">
                <div className="flex gap-2 items-center my-">
                  <div className="bg-primary  w-10 h-10 rounded-full flex justify-center items-center">
                    <FaRegClock className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm">{item?.duration}</p>
                </div>
                <div>
                  <CiCircleCheck className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Chapters;
