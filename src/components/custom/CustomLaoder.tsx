import React from "react";
import { BarLoader } from "react-spinners";

const CustomLaoder = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <BarLoader className="mb-4" width={"60%"} color="#36d7b7" />
    </div>
  );
};

export default CustomLaoder;
