"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

type SearchBarProps = {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBar = ({ searchQuery, handleSearch }: SearchBarProps) => {
  return (
    <div className="relative w-full sm:max-w-md">
      <motion.input
        type="text"
        placeholder="Search for courses"
        value={searchQuery}
        onChange={handleSearch}
        className="
          w-full
          sm:w-[70%] 
          bg-[#1E1F2B] 
          text-white 
          px-4 py-2 
          rounded-lg 
          pl-10
          border border-transparent
          focus:outline-none
          focus:border-[#4A3AFF]
        "
        whileFocus={{
          width: "100%",
          transition: { duration: 0.3 },
        }}
      />
      <Search
        className="
          absolute 
          left-3 
          top-1/2 
          -translate-y-1/2 
          text-gray-400
        "
        size={20}
      />
    </div>
  );
};