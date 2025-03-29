"use client";

import { motion } from "framer-motion";
import { CourseCard } from "./CourseCard";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

type CourseGridProps = {
  courses: {
    id: number;
    title: string;
    description: string;
    instructor: string;
    progress: number;
    image: string;
  }[];
};

export const CourseGrid = ({ courses }: CourseGridProps) => {
  return (
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
    >
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </motion.div>
  );
};