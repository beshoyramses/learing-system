"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookIcon } from "lucide-react";
import { LessonStatusIcon } from "./LessonStatusIcon";
import type { Lesson, LessonStatus } from "./types";

interface CurriculumModuleProps {
  module: {
    title: string;
    lessons: Lesson[];
  };
  currentLesson: Lesson;
  onLessonClick: (lesson: Lesson) => void;
}

export const CurriculumModule = ({ module, currentLesson, onLessonClick }: CurriculumModuleProps) => {
  return (
    <Card className="bg-[#252736] border-none">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <BookIcon className="w-6 h-6 text-blue-500" />
          <CardTitle className="text-white">{module.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {module.lessons.map((lesson, lessonIndex) => (
            <div 
              key={lessonIndex} 
              className={`flex justify-between items-center p-3 rounded-lg transition-colors
                ${lesson.status === 'locked' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-[#2C2D3A]'}
                ${lesson.title === currentLesson.title ? 'bg-[#2C2D3A] border-l-4 border-blue-500' : ''}
              `}
              onClick={() => onLessonClick(lesson)}
            >
              <div className="flex items-center space-x-3">
                <LessonStatusIcon status={lesson.status} />
                <span className={`
                  ${lesson.status === 'completed' ? 'text-green-300' : 
                    lesson.status === 'current' ? 'text-blue-300' : 'text-gray-400'}
                `}>
                  {lesson.title}
                </span>
              </div>
              <span className="text-gray-400 text-sm">{lesson.duration}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};