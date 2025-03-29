export type LessonStatus = "completed" | "current" | "locked";

export interface Lesson {
  title: string;
  status: LessonStatus;
  duration: string;
  videoUrl: string;
}

export interface Module {
  title: string;
  lessons: Lesson[];
}