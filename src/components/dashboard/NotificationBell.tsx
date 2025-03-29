"use client";

import { motion } from "framer-motion";
import { Bell } from "lucide-react";

export const NotificationBell = () => {
  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Bell className="text-gray-300" size={20} />
      <motion.span
        className="
          absolute 
          -top-2 
          -right-2 
          bg-[#4A3AFF] 
          text-white 
          rounded-full 
          w-5 
          h-5 
          flex 
          items-center 
          justify-center 
          text-xs
        "
        animate={{
          scale: [1, 1.2, 1],
          transition: { repeat: Infinity, duration: 2 },
        }}
      >
        2
      </motion.span>
    </motion.div>
  );
};