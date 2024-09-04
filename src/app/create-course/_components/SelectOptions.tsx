import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useUserInputContext } from "@/context/UserInputContext";
import { Label } from "@/components/ui/label";

const SelectOptions = () => {
  const { userData, setUserData } = useUserInputContext();

  const handleInputChange = (fileValue: any, value: any) => {
    setUserData({ ...userData, [fileValue]: value });
  };

  return (
    <div className="mt-5 mb-8 min-h-[25vh]">
      <div className="flex flex-row gap-4 items-center mb-4">
        <div className="flex-1">
          <label htmlFor="" className="text-[14px] ">
            Difficulty level
          </label>
          <div className="my-2">
            <Select
              defaultValue={userData?.level}
              onValueChange={(value) => handleInputChange("level", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
                <SelectItem value="Normal">Normal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="" className="text-[14px] ">
            Course Duration
          </label>
          <div className="my-2">
            <Select
              defaultValue={userData?.duration}
              onValueChange={(value) => handleInputChange("duration", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Hours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 Hour">1 Hour</SelectItem>
                <SelectItem value="5 Hour">5 Hour</SelectItem>
                <SelectItem value="More than 5 Hours">
                  More than 5 Hours
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-3 items-center mt-6 ">
        <div className="flex-1">
          <label htmlFor="" className="text-[14px] ">
            Add Video
          </label>
          <div className="my-1">
            <Select
              defaultValue={userData?.displayVideo}
              onValueChange={(value) =>
                handleInputChange("displayVideo", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Videos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="" className="text-[14px] ">
            No of chapters
          </label>
          <div className="my-1">
            <Input
              defaultValue={userData?.noOfChapters}
              type="number"
              onChange={(e) =>
                handleInputChange("noOfChapters", e.target.value)
              }
            />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <label htmlFor="" className="text-[14px] ">
          Price
        </label>
        <Input
          type="number"
          className="w-full"
          id="price"
          defaultValue={0}
          placeholder="price"
          onChange={(e) => handleInputChange("price", e.target.value)}
        />
      </div>
    </div>
  );
};

export default SelectOptions;
