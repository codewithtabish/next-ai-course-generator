import ThemeChanger from "@/components/custom/ThemeChanger";
import React from "react";

interface ChapterListProps {
  course: any;
  onSelectChapter: (chapter: any, item: any) => void; // Updated prop name
}

const ChapterList: React.FC<ChapterListProps> = ({
  course,
  onSelectChapter,
}) => {
  const parsedCourseOutput = JSON.parse(course?.courseOutput);

  return (
    <div
      className="min-h-screen shadow-md border-r-2 border-r-indigo-300 max-h-screen 
    overflow-y-auto dark:bg-gray-900"
    >
      <div className="flex items-center">
        <h1
          className="text-xl flex-1 mr-3 font-bold bg-primary text-white
        p-4 rounded-md "
        >
          {course?.name}
        </h1>
        <div className="mr-2">
          <ThemeChanger />
        </div>
      </div>
      <div className="flex flex-col gap-6 my-5 py-4">
        {parsedCourseOutput?.chapters.map((item: any, index: any) => {
          return (
            <div
              onClick={() => onSelectChapter(index, item)} // Updated function call
              key={index}
              className="border-b-2 border-gray-500 cursor-pointer"
            >
              <h3 className="italic max-w-[80%] py-2  cursor-pointer">
                {item?.chapterName}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterList;
