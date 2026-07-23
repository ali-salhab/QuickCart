import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="animate-spin  rounded-full h-10 w-10 border-4 border-r-orange-900 border-white-900"></div>
    </div>
  );
};

export default Loading;
