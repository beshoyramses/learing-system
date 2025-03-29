"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VideoPlayer } from "./VideoPlayer";

interface CourseHeaderProps {
  title: string;
  description: string;
  currentVideo: string;
  currentVideoProgress: number;
  onProgress: (progress: number) => void;
  onEnded: () => void;
}

export const CourseHeader = ({ 
  title, 
  description, 
  currentVideo, 
  currentVideoProgress, 
  onProgress, 
  onEnded 
}: CourseHeaderProps) => {
  return (
    <Card className="bg-[#252736] border-none">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <VideoPlayer 
          url={currentVideo} 
          onProgress={onProgress}
          onEnded={onEnded}
        />
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">UX Design</Badge>
            <Badge variant="secondary" className="bg-green-500/20 text-green-300">Beginner</Badge>
          </div>
          <div className="w-1/2">
            <Progress 
              value={currentVideoProgress} 
              className="bg-gray-700" 
            />
            <div className="text-xs text-gray-400 mt-1 text-right">
              {Math.round(currentVideoProgress)}% Complete
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};