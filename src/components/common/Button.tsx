import React from "react";

export default function Button(props: any) {
  const { children, styleType = "fill" } = props;

  const style = {
    fill: "bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded mt-4 transition duration-200 ease-in-out",
    outline:
      "hover:bg-green-600 border-green-600 border text-white font-medium py-2 px-4 rounded mt-4 transition duration-200 ease-in-out",
  };

  return (
    <button
      {...props}
      className={styleType === "outline" ? style.outline : style.fill}
    >
      {children}
    </button>
  );
}
