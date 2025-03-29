"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import type { Module, Lesson } from "./types";
import { CurriculumModule } from "./CurriculumModule";

interface CourseTabsProps {
  modules: Module[];
  currentLesson: Lesson;
  onLessonClick: (lesson: Lesson) => void;
}

export const CourseTabs = ({ modules, currentLesson, onLessonClick }: CourseTabsProps) => {
  return (
    <Tabs defaultValue="curriculum" className="w-full mt-6">
      <TabsList className="grid w-full grid-cols-3 bg-[#252736] mb-4">
        <TabsTrigger value="curriculum" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 text-white">
          Curriculum
        </TabsTrigger>
        <TabsTrigger value="resources" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 text-white">
          Resources
        </TabsTrigger>
        <TabsTrigger value="discussion" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 text-white">
          Discussion
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="curriculum" className="space-y-4">
        {modules.map((module, moduleIndex) => (
          <CurriculumModule
            key={moduleIndex}
            module={module}
            currentLesson={currentLesson}
            onLessonClick={onLessonClick}
          />
        ))}
      </TabsContent>
      
      <TabsContent value="resources">
        <Card className="bg-[#252736] border-none">
          <CardContent className="pt-6">
            <p className="text-gray-400">No resources available yet.</p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="discussion">
        <Card className="bg-[#252736] border-none">
          <CardContent className="pt-6">
            <p className="text-gray-400">No discussions yet. Be the first to start!</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};