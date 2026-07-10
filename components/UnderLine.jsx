import React from "react";

const UnderLine = ({ viaColor = "via-gray-400" }) => {
  return (
    <div
      className={`w-full h-[1px] mt-6 bg-gradient-to-r from-transparent ${viaColor} to-transparent opacity-75`}
    ></div>
  );
};

export default UnderLine;
