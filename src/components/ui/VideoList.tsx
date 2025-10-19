"use client";
import { Video } from "@/services/videoService";
import Link from "next/link";
import VideoCard from "@/components/ui/VideoCard";

export default function VideoList({ videos }: { videos: Video[] }) {
  if (videos.length === 0) {
    return (
      <div className="col-span-full text-center text-gray-500 text-lg py-16 border rounded-lg w-full bg-white dark:bg-neutral-900 shadow-sm">
        No videos yet — create one to get started 🎬
      </div>
    );
  }

  return (
    <>
      {videos.map((video) => (
        <Link
          key={video.id}
          href={`/video/${video.id}`}
          className="w-full max-w-[350px] transition-transform transform hover:scale-[1.02] hover:brightness-105"
        >
          <VideoCard video={video} />
        </Link>
      ))}
    </>
  );
}
