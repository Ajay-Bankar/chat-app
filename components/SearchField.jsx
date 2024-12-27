import React from 'react';
import { HiMagnifyingGlass } from "react-icons/hi2";

const SearchField = ({  value, onChange, placeholder }) => {
  return (
    <div className="relative flex w-full">
      <input
        type="text"
        placeholder={placeholder || "Search "}
        className="pl-10 py-2 border dark:border-0 bg-gray-100   rounded-xl w-full h-[3.25rem] focus:outline-none focus:border-[#075985]"
        value={value}
        onChange={onChange}
      />
      
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-secondary">
          {<HiMagnifyingGlass size={16} color='#000000' />}
        </div>
    
    </div>
  );
};

export default SearchField;