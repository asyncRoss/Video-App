"use client";
import { useParams } from "next/navigation";
import useVideo from "@/hooks/useVideo";
import ReactPlayer from "react-player";
import Comments from "../../../components/Comments";

export default function VideoPage() {
  const { id } = useParams();
  const { video, loading, error } = useVideo(id as string);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center">{error}</div>;
  if (!video) return <div className="p-10 text-center">No video found.</div>;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-6 max-w-8xl mx-auto">
      <div className="flex flex-col items-center xl:items-start text-left w-full">
        <div className="w-full max-w-[700px] aspect-video rounded-lg overflow-hidden shadow">
          <ReactPlayer
            src={video.video_url}
            playIcon
            controls
            width="100%"
            height="100%"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold mt-4">{video.title}</h1>
          <p className="text-gray-600 max-w-[600px] text-sm leading-relaxed">
            {video.description}
          </p>
        </div>
      </div>

      {id && <Comments videoId={id as string} />}
    </div>
  );
}
