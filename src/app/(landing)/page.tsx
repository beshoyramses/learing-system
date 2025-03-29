"use client"

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { useSearch } from "@/context/search-context";
import { useRouter } from 'next/navigation';

export default function Home() {
  const { searchQuery, setSearchQuery} = useSearch();
  const router = useRouter();
  const allCourses = [
    {
      title: "Advanced Machine Learning",
      description: "Dive deep into machine learning algorithms and neural networks with practical examples.",
      author: "Alice Johnson",
      price: "$99.99",
      enrolled: 2453,
      image: "/course-1.jpg",
      tags: ["machine learning", "AI", "deep learning"]
    },
    {
      title: "Data Science Fundamentals",
      description: "Learn the basics of data science, including data cleaning, visualization, and analysis.",
      author: "Michael Brown",
      price: "$89.99",
      enrolled: 1892,
      image: "/course-2.jpg",
      tags: ["data science", "python", "analytics"]
    },
    {
      title: "Introduction to Programming",
      description: "Learn the basics of programming with Python in this beginner-friendly course.",
      author: "John Doe",
      price: "$49.99",
      enrolled: 3567,
      image: "/course-3.jpg",
      tags: ["programming", "beginner", "python"]
    },
    {
      title: "Mobile App Development with React Native",
      description: "Build cross-platform mobile apps using React Native and JavaScript.",
      author: "Sarah Williams",
      price: "$129.99",
      enrolled: 1245,
      image: "/course-4.jpg",
      tags: ["mobile", "react native", "javascript"]
    },
    {
      title: "Web Development Bootcamp",
      description: "Full stack web development with React, Next.js, Node.js and MongoDB.",
      author: "David Chen",
      price: "$149.99",
      enrolled: 3210,
      image: "/course-5.jpg",
      tags: ["web development", "react", "nextjs"]
    },
    {
      title: "Cybersecurity Essentials",
      description: "Learn how to protect systems and networks from digital attacks.",
      author: "Emily Rodriguez",
      price: "$109.99",
      enrolled: 987,
      image: "/course-6.jpg",
      tags: ["security", "networking", "enterprise IT"]
    },
    {
      title: "Cloud Computing with AWS",
      description: "Master AWS services and deploy scalable cloud applications.",
      author: "Robert Taylor",
      price: "$119.99",
      enrolled: 1567,
      image: "/course-7.jpg",
      tags: ["cloud", "AWS", "enterprise IT"]
    },
    {
      title: "UI/UX Design Principles",
      description: "Learn to create beautiful and functional user interfaces.",
      author: "Jessica Lee",
      price: "$79.99",
      enrolled: 2345,
      image: "/course-8.jpg",
      tags: ["design", "UI", "UX"]
    }
  ];

  const handleNavigateToCourse = (course) => {
    router.push(`/course-details/${course.title}`);
  };

  // Filter courses based on search query
  const filteredCourses = allCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const featuredCourses = searchQuery ? filteredCourses : allCourses.slice(0, 4);

  return (
    <main>
      <MaxWidthWrapper>
      <div className="flex flex-col lg:flex-row bg-[#262630] rounded-lg mt-6 lg:mt-10 overflow-hidden">
          {/* Left Section - Text */}
          <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-12 text-white flex items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold logo-color mb-3">Courses</h2>
              <p className="text-gray-400 mt-2 text-sm md:text-base">
                This is the list of the courses you have enrolled in. <br className="hidden sm:block" />
                Courses when you need them and want them.
              </p>
              <button className="mt-4 md:mt-7 px-4 py-2 bg-[#7878fc] text-white rounded-lg text-sm hover:bg-[#6767d8] transition-colors">
                Search for Courses
              </button>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="w-full lg:w-1/2 h-48 sm:h-64 md:h-80 lg:h-auto relative">
            <img
              src="/landing.jpg"
              alt="Courses"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        </div>


        {/* Courses Section */}
        <div className="text-white mt-8 md:mt-12">
          <h2 className="text-xl md:text-2xl font-semibold logo-color">
            {searchQuery ? "Search Results" : "Featured Courses"}
          </h2>
          <p className="text-gray-600 text-xs md:text-sm mt-4 md:mt-7 mb-4 md:mb-7">
            {searchQuery ? 
              `${filteredCourses.length} courses found` : 
              "From beginner to advanced, in all industries, we have the right courses just for you and preparing your entire journey for learning and making the most."}
          </p>
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {["web development", "enterprise IT", "react nextjs", "machine learning", "data science"].map(
              (category) => (
                <button
                  key={category}
                  className="input-bg py-1 px-3 rounded-2xl text-gray-300 cursor-pointer text-xs md:text-sm whitespace-nowrap"
                  onClick={() => setSearchQuery(category)}
                >
                  {category}
                </button>
              )
            )}
          </div>
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No courses found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-12">
              {(searchQuery ? filteredCourses : featuredCourses).map((course, index) => (
                <Card
                  onClick={() => {handleNavigateToCourse(course)}}
                  key={index}
                  className="bg-[#262630] text-white py-0 border-none hover:translate-y-[-4px] transition-transform duration-200"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold line-clamp-2">{course.title}</h3>
                    <p className="text-gray-300 text-xs sm:text-sm mb-6 md:mb-10 line-clamp-2">
                      {course.description}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      By {course.author}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[#7878fc] font-semibold text-sm">
                        {course.price}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {course.enrolled.toLocaleString()} Enrolled
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </MaxWidthWrapper>
      <footer className="bg-[#262630] text-gray-400 text-center py-4 px-4 mt-8 md:mt-12">
        <p className="text-xs md:text-sm">© 2025 BESHOY. All Rights Reserved.</p>
        <div className="flex justify-center gap-3 md:gap-4 text-xs mt-2 flex-wrap">
          <a href="#" className="hover:text-white transition">
            About
          </a>
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition">
            Licensing
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
        </div>
      </footer>
    </main>
  );
}