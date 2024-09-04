"use client";

import CustomLaoder from "@/components/custom/CustomLaoder";
import Payment from "@/components/custom/Payment";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/config/db";
import { courseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SubscribePage = ({ params }: any) => {
  const [course, setCourse] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const { isLoaded, isSignedIn, user: authUser } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (params?.courseId) {
      getSingleCourse();
    }
  }, [params?.courseId]);

  const getSingleCourse = async () => {
    try {
      const result = await db
        .select()
        .from(courseList)
        .where(eq(courseList.courseId, params.courseId));
      console.log("Here data is ", result);
      setCourse(result[0]);
    } catch (error) {
      console.log("The error while getting the single course is ", error);
    }
  };

  const handleSubscribe = async () => {
    setLoader(true);
    try {
      const existingCourse = await db
        .select()
        .from(courseList)
        .where(eq(courseList.courseId, params.courseId))
        .execute();

      if (existingCourse?.length > 0) {
        const existingPurchases = existingCourse[0].purchases || [];

        if (
          !existingPurchases.includes(
            authUser?.primaryEmailAddress?.emailAddress
          )
        ) {
          const updatedPurchases = [
            ...existingPurchases,
            authUser?.primaryEmailAddress?.emailAddress,
          ];

          const response = await db
            .update(courseList)
            .set({ purchases: updatedPurchases })
            .where(eq(courseList.courseId, params.courseId))
            .execute();

          if (response) {
            toast({
              title: "Course Subscribed Successfully",
              description: course?.name + " handle subscribed ..",
            });
            router.push("/");
          }

          console.log("Subscription successful!");
        } else {
          toast({
            title: "Course already Subscribed ",
            description: course?.name + " already subscribed ..",
          });
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Error subscribing to course:", error);
    } finally {
      setLoader(false);
    }
  };

  if (!isLoaded) {
    return <CustomLaoder />;
  }

  return (
    <div>
      <Payment
        course={course}
        handleSubscribe={handleSubscribe}
        loader={loader}
      />
    </div>
  );
};

export default SubscribePage;
