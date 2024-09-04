import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserInputContext } from "@/context/UserInputContext";

const TopicDescription = () => {
  const { userData, setUserData } = useUserInputContext();
  const handleTopicAndDesc = (filedName: any, fieldValue: any) => {
    setUserData({ ...userData, [filedName]: fieldValue });
  };

  return (
    <div className="py-5 flex flex-col gap-4 min-h-[30vh] ">
      <div>
        <Label htmlFor="title" className="text-[14px] mb-2">
          Write a Category for which you want to create course
        </Label>
        <Input
          type="text"
          required
          id="title"
          className="my-2"
          defaultValue={userData?.topic}
          onChange={(e) => handleTopicAndDesc("topic", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="" className="text-[14px] mb-1">
          Tell us more about your course ! what do you want to include in your
          course (optional)
        </label>
        <Textarea
          defaultValue={userData?.description}
          placeholder="Type your message here."
          className="my-1"
          onChange={(e) => handleTopicAndDesc("description", e.target.value)}
        />
      </div>
    </div>
  );
};

export default TopicDescription;
