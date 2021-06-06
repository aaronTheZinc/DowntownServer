import React, { FC } from "react";
import { SearchBarProps } from "../../types";

export const ProductSearch: FC<SearchBarProps> = ({
  setVal,
  value,
}): JSX.Element => {
  return (
    <div className="min-w-3/4 h-auto opacity-80">
      <input className="shadow-md ... text-center text-white p-4 w-3/4 xl:min-w-max  bg-[#080808] outline-none rounded-3xl font-bold" placeholder="Search" />
    </div>
  );
};
