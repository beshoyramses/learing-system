"use client";

import { CheckCircle2Icon, PlayCircleIcon, LockIcon } from "lucide-react";

type LessonStatus = "completed" | "current" | "locked";

interface LessonStatusIconProps {
  status: LessonStatus;
}

export const LessonStatusIcon = ({ status }: LessonStatusIconProps) => {
  switch(status) {
    case 'completed':
      return <CheckCircle2Icon className="w-5 h-5 text-green-500" />;
    case 'current':
      return <PlayCircleIcon className="w-5 h-5 text-blue-500" />;
    case 'locked':
      return <LockIcon className="w-5 h-5 text-gray-400" />;
    default:
      return null;
  }
};