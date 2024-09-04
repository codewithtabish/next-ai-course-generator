import React from "react";
import CourseSearch from "./_components/CourseSearch";
import RecommendedCourseList from "@/components/custom/RecommendedCourseList";
import AllCourses from "./_components/AllCourses";
import SearchCourseContext from "@/context/SearchCourseContext";

const CoursesPage = () => {
  return (
    <SearchCourseContext>
      <div>
        <div className="py-20">
          <CourseSearch />
          <AllCourses />
        </div>
      </div>
    </SearchCourseContext>
  );
};

export default CoursesPage;
