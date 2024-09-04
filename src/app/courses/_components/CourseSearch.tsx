"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchContext } from "@/context/SearchCourseContext";
import categoryList from "@/static/categoryList";
import Data from "@/static/Data";
import { Search } from "lucide-react";
import { useState } from "react";
import { TbClearAll } from "react-icons/tb";

const CourseSearch = () => {
  const [course, setCourse] = useState<string | undefined>();
  const [level, setLevel] = useState<string | undefined>();
  const [price, setPrice] = useState<string | undefined>();
  const { searchData, setsearchData } = useSearchContext();

  const handleGather = () => {
    const updatedSearchData: any = {};
    if (course) updatedSearchData.course = course;
    if (price) updatedSearchData.price = price;
    if (level) updatedSearchData.level = level;

    setsearchData(updatedSearchData);
  };

  const handleReset = () => {
    setsearchData({});
    setCourse(undefined);
    setPrice(undefined);
    setLevel(undefined);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold py-4">Search Favourite Course</h2>
      <div className="border-2 border-gray-400 mx-auto p-3 rounded-full my-4 shadow-md">
        <div className="flex gap-4 items-center justify-center">
          <Select
            onValueChange={(value: string) => setCourse(value)}
            value={course}
          >
            <SelectTrigger className="outline-none border-none">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categoryList.map((item, index) => (
                <SelectItem value={item.name} key={index}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <SelectSeparator />
          <Select
            onValueChange={(value: string) => setLevel(value)}
            value={level}
          >
            <SelectTrigger className="outline-none border-none">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              {Data.levels.map((item: any, index: number) => (
                <SelectItem value={item.name} key={index}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <SelectSeparator />
          <Select
            onValueChange={(value: string) => setPrice(value)}
            value={price}
          >
            <SelectTrigger className="outline-none border-none">
              <SelectValue placeholder="Pricing" />
            </SelectTrigger>
            <SelectContent className="outline-none border-none">
              {Data.Pricing.map((item: any, index: number) => (
                <SelectItem value={item.amount} key={index}>
                  {item.amount}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <SelectSeparator />
          {/* 
          {course || level || price ? (
            <Button
              onClick={handleReset}
              className="bg-red-900 p-2 flex justify-center cursor-pointer items-center rounded-full"
            >
              <TbClearAll className="w-6 h-6 text-white" />
            </Button>
          ) : ( */}
          <Button
            onClick={handleGather}
            className="bg-primary p-2 flex justify-center cursor-pointer items-center rounded-full"
          >
            <Search className="w-6 h-6 text-white" />
          </Button>
          {/* )} */}
        </div>
      </div>
      {/* {JSON.stringify(searchData)} */}
    </div>
  );
};

export default CourseSearch;
