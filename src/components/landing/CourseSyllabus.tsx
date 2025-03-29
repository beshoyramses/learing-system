const CourseSyllabus = ({ weeks }) => {
    return (
      <div className="bg-[#262630] rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Course Syllabus</h2>
        <div className="space-y-4">
          {weeks.map((week) => (
            <div key={week.number} className="border border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Week {week.number}</h3>
                <span className="text-xs text-gray-400">{week.lessons} lessons</span>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                {week.title}
              </p>
              <div className="flex justify-between text-xs">
                <span className="text-green-500">{week.level}</span>
                <span>{week.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default CourseSyllabus;