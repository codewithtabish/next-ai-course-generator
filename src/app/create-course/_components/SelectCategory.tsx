import { useUserInputContext } from "@/context/UserInputContext";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import * as Icons from "react-icons/fa";

import categories from "@/static/categoryList"; // Adjust the path as needed

const SelectCategory = () => {
  const { userData, setUserData } = useUserInputContext();

  const handleCategory = (category: any) => {
    setUserData({ ...userData, category: category });
  };

  return (
    <Carousel>
      <CarouselContent className="">
        {categories.map((item, index: number) => {
          // @ts-ignore
          const IconComponent = Icons[item.icon]; // Get the icon component dynamically

          return (
            <CarouselItem
              key={index}
              onClick={() => handleCategory(item.name)}
              className={`flex flex-col justify-center items-center
                basis-1/3 min-w-[150px] max-w-[150px] mx-3 my-5
                border-2 shadow-md p-2 flex-1 py-5 rounded-lg cursor-pointer
                ${
                  userData?.category === item.name && "border-primary border-2 "
                }
                hover:scale-105 transition-all duration-500`}
            >
              {IconComponent && (
                <IconComponent className="text-4xl text-primary" />
              )}{" "}
              {/* Render the icon if it exists */}
              <h3 className="py-1 font-bold">{item.name}</h3>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default SelectCategory;
