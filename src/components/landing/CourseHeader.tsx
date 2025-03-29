import Image from 'next/image';

const CourseHeader = ({ course }) => {
  return (
    <div className="bg-[#262630] rounded-lg overflow-hidden p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 relative h-64 md:h-auto">
          <Image 
            src="/course-1.jpg" 
            alt={course.title} 
            layout="fill"
            className="object-cover rounded-lg"
            priority
          />
        </div>
        
        <div className="md:w-2/3">
          <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-400 mb-4">
            {course.description}
          </p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Advanced Purchase Learning</h3>
            <p className="text-gray-400 mb-4">
              {course.longDescription}
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Duration</p>
                <p>{course.duration}</p>
              </div>
              <div>
                <p className="text-gray-400">Level</p>
                <p>{course.level}</p>
              </div>
              <div>
                <p className="text-gray-400">Lessons</p>
                <p>{course.lessons}</p>
              </div>
              <div>
                <p className="text-gray-400">Certificate</p>
                <p>{course.certificate}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Course Instructor</h3>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold mr-3">
                {course.instructor.initials}
              </div>
              <div>
                <p className="font-medium">{course.instructor.name}</p>
                <p className="text-gray-400 text-sm">{course.instructor.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;