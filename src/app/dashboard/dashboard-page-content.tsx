"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TopNavigation } from "@/components/dashboard/TopNavigation";
import { CourseGrid } from "@/components/dashboard/CourseGrid";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const coursesData = [
  {
    id: 1,
    title: "Advanced Medical Training Course",
    description: "Advanced medical training to improve skills and techniques",
    instructor: "Dr. Smith",
    progress: 65,
    image: "/course-1.jpg",
  },
  {
    id: 2,
    title: "Emergency Response Procedures",
    description: "Learn critical emergency response protocols and life-saving techniques",
    instructor: "Dr. Johnson",
    progress: 30,
    image: "/course-2.jpg",
  },
  {
    id: 3,
    title: "Pediatric Care Fundamentals",
    description: "Essential training for pediatric care and child patient management",
    instructor: "Dr. Williams",
    progress: 80,
    image: "/course-3.jpg",
  },
  {
    id: 4,
    title: "Surgical Techniques Masterclass",
    description: "Advanced surgical methods and operating room best practices",
    instructor: "Dr. Brown",
    progress: 45,
    image: "/course-4.jpg",
  },
];

export const DashBoardPageContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(coursesData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredCourses(coursesData);
    } else {
      const filtered = coursesData.filter(
        (course) =>
          course.title.toLowerCase().includes(query)
      );
      setFilteredCourses(filtered);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="min-h-screen text-white p-4 sm:p-6"
    >
      <TopNavigation searchQuery={searchQuery} handleSearch={handleSearch} />

      <motion.h1
        variants={itemVariants}
        className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6"
      >
        My Courses
      </motion.h1>

      {filteredCourses.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10 col-span-full w-full"
        >
          <p className="text-gray-400">
            No courses found matching your search.
          </p>
        </motion.div>
      )}

      <CourseGrid courses={filteredCourses} />
    </motion.div>
  );
};