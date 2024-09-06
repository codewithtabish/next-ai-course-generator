import React from "react";
import SideBar from "./_components/SideBar";
import DashBoardHeader from "./_components/DashBoardHeader";
import UserCourseListContext from "@/context/UserCourseListContext";

const dashboardLayout = ({ children }: any) => {
  return (
    <UserCourseListContext>
      <div className="grid grid-cols-12 gap-4">
        <div className="grid col-span-2 col-start-auto w-full  py-5 shadow-md dark:border-r-2 border-b-gray-[50] h-screen">
          <SideBar />
        </div>
        <div
          className="
        col-span-10
      py-5
      "
        >
          {/* <DashBoardHeader /> */}
          <div className="p-10">{children}</div>
        </div>
      </div>
    </UserCourseListContext>
  );
};

export default dashboardLayout;
