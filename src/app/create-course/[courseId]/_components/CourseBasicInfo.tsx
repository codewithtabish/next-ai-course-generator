"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { TbRibbonHealth } from "react-icons/tb";
import CourseDialouge from "./CourseDialouge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storageDB } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db } from "@/config/db";
import { courseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import CustomLaoder from "@/components/custom/CustomLaoder";

const CourseBasicInfo = ({ course, fromViewCourse }: any) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [updatedCourse, setUpdatedCourse] = useState<any>(course); // Local state to store the updated course data

  if (!course) {
    <CustomLaoder />;
  }

  const parsedCourseOutput = JSON?.parse(updatedCourse?.courseOutput);

  type FileChangeEvent = React.ChangeEvent<HTMLInputElement>;

  const handleFileChange = (event: FileChangeEvent) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(URL.createObjectURL(file));
    setIsUploading(true);

    const storageRef = ref(storageDB, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
        setIsUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(storageRef);
        try {
          const result = await db
            .update(courseList)
            .set({
              courseBanner: downloadURL,
            })
            .where(eq(courseList.id, updatedCourse?.id));

          if (result) {
            setUploadProgress(null);
            setIsUploading(false);
            setSelectedFile(null);

            // Fetch the updated course data from the database and update the state
            const updatedCourseData = {
              ...updatedCourse,
              courseBanner: downloadURL,
            };
            setUpdatedCourse(updatedCourseData);
          }
        } catch (error) {
          console.error("Database update failed:", error);
          setIsUploading(false);
        }
      }
    );
  };

  return (
    <div className="my-8 border p-10">
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 flex-col gap-3 flex">
          <h2 className="font-bold dark:text-gray-200 md:max-w-[80%] text-gray-700">
            {parsedCourseOutput?.courseName}
            <span className="mx-3">
              <CourseDialouge course={updatedCourse} />
            </span>
          </h2>
          <p className="dark:text-gray-500 text-gray-700">
            {parsedCourseOutput?.description}
          </p>

          {updatedCourse?.category == "Programming" ? (
            <div className="w-10 h-10 flex justify-center items-center bg-secondary rounded-full">
              <TbRibbonHealth className="w-6 h-6 text-white" />
            </div>
          ) : null}

          <Link
            href={fromViewCourse ? `/course/${course?.courseId}/start` : "/"}
            className="w-full"
          >
            <Button className="mt-5 dark:text-white w-full">Start</Button>
          </Link>
        </div>
        <div className="flex-1 relative">
          <Label
            htmlFor="course-image"
            className={isUploading ? "" : "cursor-pointer"}
          >
            <Image
              src={
                selectedFile
                  ? selectedFile
                  : updatedCourse?.courseBanner || "/courseone.jpeg"
              }
              width={300}
              height={300}
              className="w-full rounded-lg object-cover h-[250px]"
              alt="course image"
            />
            {uploadProgress !== null && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <p className="text-white font-bold">{`Uploading ${Math.round(
                  uploadProgress
                )}%`}</p>
              </div>
            )}
          </Label>
          <Input
            type="file"
            id="course-image"
            className={`transparent opacity-0 ${
              isUploading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onChange={handleFileChange}
            disabled={isUploading || fromViewCourse} // Disable the input while uploading
          />
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
