import React from "react";

export default function HeaderBox({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl lg:text-30 font-semibold text-gray-900">
        {title}
        {type === "greeting" && (
          <span className="text-blue-500">&nbsp;{user}</span>
        )}
      </h1>
      <p className="text-14 lg:text-16 font-normal text-gray-600">{subtext}</p>
    </div>
  );
}
