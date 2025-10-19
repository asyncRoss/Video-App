"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import AddVideoDialog from "@/components/AddVideoDialog";
import VideoList from "@/components/ui/VideoList";
import useVideos from "@/hooks/useVideos";

export default function Home() {
  const { videos, loading, error, refetchVideos } = useVideos();

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (loading) {
    return <div className="text-gray-500 text-center">Loading videos...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-10">
      <div className="flex justify-between p-10">
        <h1 className="text-xl font-semibold">Watch. Learn. Level up.</h1>
        <AddVideoDialog onSuccess={refetchVideos} />
      </div>

      <div className="flex justify-center px-4 sm:px-6 lg:px-10 py-8">
        <div className="grid w-full max-w-6xl gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          <VideoList videos={videos} />
        </div>
      </div>
    </div>
  );
}
