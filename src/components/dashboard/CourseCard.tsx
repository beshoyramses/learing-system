"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const hoverScale = {
  scale: 1.03,
  transition: { duration: 0.2 },
};

const tapScale = {
  scale: 0.98,
};

type CourseCardProps = {
  course: {
    id: number;
    title: string;
    description: string;
    instructor: string;
    progress: number;
    image: string;
  };
  index: number;
};

export const CourseCard = ({ course, index }: CourseCardProps) => {
  return (
    <Link href={`dashboard/courses/${course.id}`}>
      <motion.div
        whileHover={hoverScale}
        whileTap={tapScale}
        className="bg-[#1E1F2B] rounded-lg overflow-hidden"
      >
        <div className="relative pt-[56.25%]">
          <img
            src={course.image}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <motion.div
              className="bg-white/20 rounded-full p-2 sm:p-3"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6 sm:w-8 sm:h-8"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
            {course.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-4 line-clamp-2">
            {course.description}
          </p>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-700 rounded-full"></div>
              <span className="text-xs sm:text-sm text-gray-300">
                {course.instructor}
              </span>
            </div>

            <motion.div
              className="text-xs sm:text-sm text-[#4A3AFF] font-medium"
              whileHover={{ x: 5 }}
            >
              Continue
            </motion.div>
          </div>

          <div className="mt-3 sm:mt-4 bg-gray-700 rounded-full h-1 sm:h-2">
            <motion.div
              className="bg-[#4A3AFF] rounded-full h-full"
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};