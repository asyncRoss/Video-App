"use client";
import ReactPlayer from "react-player";
import { Video } from "@/services/videoService";

export default function VideoCard({ video }: { video: Video }) {
  return (
    <div className="pointer-events-none w-full max-w-[350px] aspect-[3/3.1] flex flex-col border rounded-xl shadow-sm hover:shadow-md overflow-hidden bg-white dark:bg-neutral-900 cursor-pointer transition-all duration-300 ease-out">
      <div className="aspect-video">
        <ReactPlayer
          src={video.video_url}
          light={true}
          playIcon
          controls
          width="100%"
          height="100%"
        />
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
            {video.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 min-h-[40px]">
            {video.description}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>
            {new Date(video.created_at).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span>{video.num_comments} comments</span>
        </div>
      </div>
    </div>
  );
}
