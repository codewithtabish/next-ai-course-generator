"use client";
import ThemeChanger from "@/components/custom/ThemeChanger";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";
import { useTheme } from "next-themes";

const DashBoardHeader = () => {
  const { setTheme, theme } = useTheme();
  const { isLoaded, isSignedIn, user: authUser } = useUser();

  return (
    <div
      className={`flex justify-between items-center border-b-[1px]
      py-2
  ${theme === "dark" ? "border-gray-[50]" : "border-b-gray-300"}
    px-5`}
    >
      <div>
        <Image
          src={"/logo.svg"}
          width={90}
          height={70}
          alt="logo image"
          //   className="mb-2"
        />
      </div>
      <div className="flex gap-3 items-center">
        <ThemeChanger />
        {!isLoaded ? (
          <div className="w-6 h-6 animate-spin transition-all rounded-md duration-500 spinner  border-gray-800 dark:border-gray-50 border-2"></div>
        ) : (
          <UserButton
            appearance={{
              baseTheme: theme == "dark" ? dark : shadesOfPurple,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DashBoardHeader;
