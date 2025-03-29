import React from 'react';
import CourseHeader from '@/components/landing/CourseHeader';
import CourseSyllabus from '@/components/landing/CourseSyllabus';
import EnrollmentCard from '@/components/landing/EnrollmentCard';
import Footer from '@/components/landing/Footer';

const CourseDetails = () => {
  const courseData = {
    title: "Speed Checkout",
    description: "Learn how to implement a fast and efficient checkout process for your e-commerce website",
    longDescription: "Master the techniques to create a seamless checkout experience that boosts conversion rates",
    duration: "6 weeks",
    level: "Advanced",
    lessons: "24 lessons",
    certificate: "Yes",
    instructor: {
      name: "John Doe",
      role: "E-commerce Specialist",
      initials: "JD"
    },
    price: 99.99,
    weeks: [
      {
        number: 1,
        title: "Introduction to Checkout Optimization",
        lessons: 4,
        duration: "45 mins",
        level: "Beginner"
      },
      {
        number: 2,
        title: "Payment Processing Integration",
        lessons: 4,
        duration: "45 mins",
        level: "Beginner"
      },
      {
        number: 3,
        title: "Testing and Analytics",
        lessons: 4,
        duration: "45 mins",
        level: "Beginner"
      }
    ],
    benefits: [
      {
        title: "Full Lifetime Access",
        description: "Learn at your own pace"
      },
      {
        title: "Certificate of Completion",
        description: "Add to your portfolio"
      },
      {
        title: "Community Support",
        description: "Access to student forums"
      }
    ]
  };

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <CourseHeader course={courseData} />
            <CourseSyllabus weeks={courseData.weeks} />
          </div>
          <EnrollmentCard 
            price={courseData.price} 
            benefits={courseData.benefits} 
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetails;