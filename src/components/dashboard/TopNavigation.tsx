"use client";

import { motion } from "framer-motion";
import { UserButton } from "@clerk/nextjs";
import { SearchBar } from "./SearchBar";
import { NotificationBell } from "./NotificationBell";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

type TopNavigationProps = {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TopNavigation = ({ searchQuery, handleSearch }: TopNavigationProps) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8"
    >
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      
      <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-normal">
        <NotificationBell />
        <div className="user-button-wrapper">
          <UserButton />
        </div>
      </div>
    </motion.div>
  );
};