"use client";

import { useRef, useEffect, useState } from 'react';
import { Volume2Icon, VolumeXIcon, FullscreenIcon } from "lucide-react";

interface VideoPlayerProps {
  url: string;
  onProgress: (progress: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export const VideoPlayer = ({ url, onProgress, onPlay, onPause, onEnded }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        const progress = (video.currentTime / video.duration) * 100;
        onProgress(progress);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [onProgress]);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    
    const handlePlay = () => onPlay?.();
    const handlePause = () => onPause?.();
    const handleEnded = () => onEnded?.();

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onPlay, onPause, onEnded]);

  if (!url) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-400">
        Video source not available
      </div>
    );
  }

  return (
    <div className={`relative aspect-video bg-gray-800 rounded-lg overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 w-screen h-screen' : ''}`}>
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls
          muted={isMuted}
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};