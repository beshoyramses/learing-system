import { Module } from "@/components/dashboard/types";

export const initialCurriculumModules: Module[] = [
  {
    title: "Introduction to UX Design",
    lessons: [
      { 
        title: "What is UX Design?", 
        status: "current",
        duration: "12:45",
        videoUrl: "/2025-03-27 22-48-39.mp4"
      },
      { 
        title: "User Research Fundamentals", 
        status: "locked",
        duration: "45:30",
        videoUrl: "/2025-03-27 22-48-39.mp4"
      },
      { 
        title: "Design Thinking Process", 
        status: "locked",
        duration: "53:20",
        videoUrl: "/2025-03-27 22-48-39.mp4"
      }
    ]
  },
  {
    title: "User Research Techniques",
    lessons: [
      { 
        title: "Qualitative Research Methods", 
        status: "locked",
        duration: "38:15",
        videoUrl: ""
      },
      { 
        title: "Quantitative Research Approaches", 
        status: "locked",
        duration: "42:55",
        videoUrl: ""
      }
    ]
  }
];