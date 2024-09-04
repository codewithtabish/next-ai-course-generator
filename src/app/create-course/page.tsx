import React from "react";
import Stepper from "./_components/Stepper";
import UserInputContextProvider from "@/context/UserInputContext";

const page = () => {
  return (
    <UserInputContextProvider>
      <div className="">
        <div className="py-5">
          <h1 className="font-bold text-3xl text-center">Create Course</h1>
        </div>
        <Stepper />
      </div>
    </UserInputContextProvider>
  );
};

export default page;
