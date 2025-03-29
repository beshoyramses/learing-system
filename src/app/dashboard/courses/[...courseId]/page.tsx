"use client";

import { useState } from 'react';
import { CourseHeader, CourseTabs } from "@/components/dashboard";
import { initialCurriculumModules } from "@/lib/courseData";

export default function CoursePage() {
  const [curriculumModules, setCurriculumModules] = useState(initialCurriculumModules);
  const [currentVideo, setCurrentVideo] = useState(initialCurriculumModules[0].lessons[0].videoUrl);
  const [currentLesson, setCurrentLesson] = useState(initialCurriculumModules[0].lessons[0]);
  const [currentVideoProgress, setCurrentVideoProgress] = useState(0);

  const unlockNextLesson = () => {
    setCurriculumModules(prevModules => {
      const newModules = [...prevModules];
      let foundCurrent = false;
      
      for (let i = 0; i < newModules.length; i++) {
        for (let j = 0; j < newModules[i].lessons.length; j++) {
          const lesson = newModules[i].lessons[j];
          
          if (lesson.title === currentLesson.title) {
            foundCurrent = true;
            newModules[i].lessons[j] = { ...lesson, status: "completed" };
            
            if (j + 1 < newModules[i].lessons.length) {
              newModules[i].lessons[j+1] = { ...newModules[i].lessons[j+1], status: "current" };
            } else if (i + 1 < newModules.length && newModules[i+1].lessons.length > 0) {
              newModules[i+1].lessons[0] = { ...newModules[i+1].lessons[0], status: "current" };
            }
          }
        }
        if (foundCurrent) break;
      }
      
      return newModules;
    });
  };

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.status === 'locked') return;
    
    setCurrentVideo(lesson.videoUrl);
    setCurrentLesson(lesson);
    setCurrentVideoProgress(0);
  };

  const handleVideoProgress = (progress: number) => {
    setCurrentVideoProgress(progress);
  };

  const handleVideoEnded = () => {
    setCurrentVideoProgress(100);
    unlockNextLesson();
  };

  return (
    <div className="w-full min-h-screen text-white p-6 pl-0 space-y-6">
      <div className="max-w-6xl mx-auto">
        <CourseHeader
          title="UX Design Masterclass"
          description="Comprehensive course by Majestic Glue"
          currentVideo={currentVideo}
          currentVideoProgress={currentVideoProgress}
          onProgress={handleVideoProgress}
          onEnded={handleVideoEnded}
        />

        <CourseTabs
          modules={curriculumModules}
          currentLesson={currentLesson}
          onLessonClick={handleLessonClick}
        />
      </div>
    </div>
  );
}