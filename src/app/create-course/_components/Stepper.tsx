"use client";
import React, { useState } from "react";
import { FaCheckCircle, FaRegListAlt, FaInfoCircle } from "react-icons/fa";
import SelectCategory from "./SelectCategory";
import { Button } from "@/components/ui/button";
import TopicDescription from "./TopicDescription";
import SelectOptions from "./SelectOptions";
import { useUserInputContext } from "@/context/UserInputContext";
import { GenerateCourseLayout } from "@/config/aiModel";
import { db } from "@/config/db";
import { courseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import uuid4 from "uuid4";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";
import SelectPayment from "./SelectPayment";

const steps = [
  { label: "Category 1" },
  { label: "Topic & Desc", icon: <FaRegListAlt /> },
  { label: "Category 3", icon: <FaInfoCircle /> },
];

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { userData, setUserData } = useUserInputContext();
  const [courseLoader, setCourseLoader] = useState(false);
  const { isLoaded, isSignedIn, user: authUser } = useUser();
  const router = useRouter();

  // Function to generate the course when the last step is reached
  const generateCourse = async () => {
    setCourseLoader(true);

    const BASIC_PROMT =
      " Generate a course tutorial on the following details with fields as Course Name, description, along with chapter Name, about, duration.";
    const User_promt = ` Category: ${userData?.category}, topic: ${userData?.topic}, level: ${userData?.level}, duration: ${userData?.duration}, noOfChapters: ${userData?.noOfChapters}, in JSON format.`;
    const finalPromt = BASIC_PROMT + User_promt;

    console.log("Generating course with data:", userData);
    const result = await GenerateCourseLayout.sendMessage(finalPromt);

    setCourseLoader(false);
    sendDataToDB(JSON.stringify(await result?.response?.text()));
  };

  // Function to send data to the database
  const sendDataToDB = async (data: any) => {
    setCourseLoader(true);
    // Generate a unique course ID
    const courseId = uuid4().toString();

    // Insert data into the courseList table
    try {
      // @ts-ignore
      const response = await db.insert(courseList).values({
        courseId: courseId, // Unique identifier for the course
        name: userData?.topic, // Course name from userData
        level: userData?.level, // Course level from userData
        category: userData?.category, // Course category from userData
        courseOutput: data, // Course output data
        createdBy: authUser?.primaryEmailAddress?.emailAddress, // Creator's email
        userName: authUser?.fullName, // Creator's name
        UserProfileImage: authUser?.imageUrl, // Creator's profile image
        includeVideo: userData?.displayVideo,
        price: userData?.price,
      });
      router.replace("/create-course/" + courseId);
      setCourseLoader(false);
    } catch (error) {
      setCourseLoader(false);
      console.log("The error  at dabase is ", error);
    } finally {
      router.replace("/create-course/" + courseId);
      setCourseLoader(false);
    }

    // Handle response or errors if needed
    // console.log("Data inserted successfully:", response);
  };
  // Handler for the "Next" button
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      generateCourse();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  // Handler for the "Previous" button
  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Check if the "Next" button should be disabled
  const isNextDisabled = () => {
    switch (activeStep) {
      case 0:
        return !userData?.category;
      case 1:
        return !userData?.topic;
      case 2:
        return !(
          userData?.duration &&
          userData?.noOfChapters &&
          userData?.level &&
          userData?.displayVideo &&
          userData?.price
        );
      default:
        return false;
    }
  };

  // Render the component based on the active step
  const renderStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <SelectCategory />;
      case 1:
        return <TopicDescription />;
      case 2:
        return <SelectOptions />;

      default:
        return null;
    }
  };

  return (
    <div className="max-w-[500px] mx-auto p-4">
      <div>
        <h2 className="sr-only">Steps</h2>

        <div className="relative mt-8">
          <ol className="flex justify-between items-center text-sm font-medium text-gray-600">
            {steps.map((step, index) => {
              const isCompleted = index < activeStep;
              const isActive = index === activeStep;

              return (
                <li
                  key={index}
                  className={`relative flex flex-col items-center ${
                    !isCompleted && !isActive ? "cursor-not-allowed" : ""
                  }`}
                >
                  <span
                    className={`w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-transform duration-200 ${
                      isCompleted
                        ? "bg-green-500 text-white transform scale-105"
                        : isActive
                        ? "bg-blue-500 text-white transform scale-105"
                        : "bg-gray-300 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <FaCheckCircle />
                    ) : step.icon ? (
                      step.icon
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span
                    className={`mt-3 text-center font-semibold ${
                      isActive || isCompleted
                        ? "text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="absolute w-full h-1 bg-gray-300 top-1/2 left-full transform -translate-y-1/2 -translate-x-1/2 z-[-1]"></div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {renderStepComponent()}

        <div className="flex justify-end mt-8">
          {activeStep > 0 && (
            <Button
              size={"lg"}
              onClick={handlePrevious}
              disabled={activeStep === 0}
              className="mr-4 dark:text-white"
            >
              Previous
            </Button>
          )}
          <Button
            className="dark:text-white flex items-center justify-center"
            size={"lg"}
            onClick={handleNext}
            disabled={isNextDisabled() || courseLoader}
          >
            {activeStep === 2 ? "Generate Course" : "Next"}{" "}
            {courseLoader && (
              <div className="w-6 h-6 ml-2 animate-spin rounded-full border-2 border-t-transparent border-gray-800 dark:border-gray-50"></div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
