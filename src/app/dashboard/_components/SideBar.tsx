"use client";
import Image from "next/image";
import React from "react";
import { Home, Search, ArrowUpCircle, BookOpen, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useUserCourseListContext } from "@/context/UserCourseListContext";

const SideBar = () => {
  const path = usePathname();
  const { theme } = useTheme();
  const { userCourseList: globalUserCourseList, setuserCourseList } =
    useUserCourseListContext();
  const navMenu = [
    {
      id: 1,
      name: "Home",
      path: "/dashboard",
      icon: Home, // Import the Home icon from lucide-react
    },
    {
      id: 2,
      name: "Explore",
      path: "/dashboard/explore",
      icon: Search, // Import the Search icon for Explore
    },
    {
      id: 3,
      name: "Upgrade",
      path: "/dashboard/upgrade",
      icon: ArrowUpCircle, // Import the ArrowUpCircle icon for Upgrade
    },
    {
      id: 4,
      name: "Courses",
      path: "/dashboard/courses",
      icon: BookOpen, // Import the BookOpen icon for Courses
    },
    {
      id: 5,
      name: "Logout",
      path: "/logout",
      icon: LogOut, // Import the LogOut icon for Logout
    },
  ];

  return (
    <div className="px-5">
      <Image
        src={"/logo.svg"}
        width={90}
        height={70}
        alt="logo image"
        className="mb-2"
      />
      <hr />
      <ul className="space-y-6 mt-8">
        {navMenu?.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.path}
              className={`flex gap-4 items-center hover:bg-primary rounded-lg p-2 w-full dark:hover:bg-primary
                ${
                  path == item.path
                    ? theme == "dark"
                      ? "bg-primary"
                      : "bg-primary"
                    : ""
                }`}
            >
              <item.icon
                className={`${
                  path == item.path
                    ? theme !== "dark"
                      ? "text-white"
                      : null
                    : ""
                } inline-block mr-2`}
              />
              <div
                className={`${
                  path == item.path
                    ? theme !== "dark"
                      ? "text-white"
                      : null
                    : ""
                }`}
              >
                {item?.name}
              </div>
            </Link>
          );
        })}
      </ul>
      <div className="absolute bottom-3 w-28 flex flex-col gap-1 justify-center items-center">
        <Progress value={(globalUserCourseList?.length / 5) * 100} />
        <h2 className="font-bold">{globalUserCourseList?.length} out of 5</h2>
        <Badge variant="outline" className="cursor-pointer">
          upgrade to pro
        </Badge>
      </div>
    </div>
  );
};

export default SideBar;
