import CustomLaoder from "@/components/custom/CustomLaoder";
import React from "react";
import { FaRegClock, FaListUl, FaRegEye, FaLevelUpAlt } from "react-icons/fa"; // Importing appropriate icons
import { BarLoader } from "react-spinners";

const CourseDetail = ({ course }: any) => {
  const parsedCourseOutput = JSON.parse(course?.courseOutput);
  if (!course) {
    return <CustomLaoder />;
  }

  return (
    <div className="border p-6 my-10 rounded-md flex justify-between items-center">
      {/* Skill Level Section */}
      <div className="flex flex-row gap-3 items-center">
        <FaLevelUpAlt className="w-8 h-8 text-primary" />{" "}
        {/* Skill Level Icon */}
        <div className="flex flex-col items-center">
          <p className="text-[10px]">Skill Level</p>
          <p>{course?.level}</p>
        </div>
      </div>

      {/* Duration Section */}
      <div className="flex flex-row gap-3 items-center">
        <FaRegClock className="w-8 h-8 text-primary" /> {/* Duration Icon */}
        <div className="flex flex-col items-center">
          <p className="text-[10px]">Duration</p>
          <p>{parsedCourseOutput?.duration}</p>
        </div>
      </div>

      {/* Number of Chapters Section */}
      <div className="flex flex-row gap-3 items-center">
        <FaListUl className="w-8 h-8 text-primary" />{" "}
        {/* Number of Chapters Icon */}
        <div className="flex flex-col items-center">
          <p className="text-[10px]">No. of Chapters</p>
          <p>{parsedCourseOutput?.noOfChapters}</p>
        </div>
      </div>

      {/* Display Video Section */}
      <div className="flex flex-row gap-3 items-center">
        <FaRegEye className="w-8 h-8 text-primary" /> {/* Display Video Icon */}
        <div className="flex flex-col items-center">
          <p className="text-[10px]">Display Video</p>
          <p>{parsedCourseOutput?.displayVideo ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
