import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CiEdit } from "react-icons/ci";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/config/db";
import { courseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import CustomLaoder from "@/components/custom/CustomLaoder";

const CourseDialouge = ({ course }: any) => {
  if (!course) {
    <CustomLaoder />;
  }

  // Safely parse the courseOutput
  let parsedCourseOutput;
  try {
    parsedCourseOutput = course?.courseOutput
      ? JSON.parse(course.courseOutput)
      : {};
  } catch (e) {
    console.error("Error parsing courseOutput: ", e);
    parsedCourseOutput = {};
  }

  const [courseName, setcourseName] = useState<any>(
    parsedCourseOutput?.courseName || ""
  );
  const [courseDescription, setcourseDescription] = useState<any>(
    parsedCourseOutput?.description || ""
  );

  const handleChange = async () => {
    try {
      // Update the parsedCourseOutput object with new values
      parsedCourseOutput.courseName = courseName;
      parsedCourseOutput.description = courseDescription;

      // Convert the updated object back to a JSON string
      const updatedCourseOutput = JSON.stringify(parsedCourseOutput);

      // Update the courseOutput in the database
      const response = await db
        .update(courseList)
        .set({
          courseOutput: updatedCourseOutput, // Save as a JSON string
        })
        .where(eq(courseList.id, course?.id))
        .returning({ id: courseList?.id });

      console.log("Course updated successfully: ", response);
    } catch (e: any) {
      console.error("The error while updating the course is ", e);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <CiEdit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course & Description</DialogTitle>
          <DialogDescription>
            <Label>Course Title</Label>
            <Input
              type="text"
              className="my-2"
              value={courseName}
              onChange={(e) => setcourseName(e.target.value)}
            />
            <div className="my-2">
              <Label>Course Description</Label>
              <Textarea
                className="my-2"
                value={courseDescription}
                onChange={(e) => setcourseDescription(e.target.value)}
                cols={7}
                rows={6}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button
              className="dark:text-white text-white"
              onClick={handleChange}
            >
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDialouge;
