import React from "react";

const loading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-6 h-6 animate-spin transition-all rounded-md duration-500 spinner  border-gray-800 dark:border-gray-50 border-2"></div>
    </div>
  );
};

export default loading;
