"use client";
import { useState, useEffect, useCallback } from "react";
import videosService, { Video } from "@/services/videoService";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus } from "lucide-react";
// import { useRouter } from "next/navigation";
import Link from "next/link";

import ReactPlayer from "react-player";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
  });

  const clearFormData = () =>
    setFormData({
      title: "",
      description: "",
      video_url: "",
    });

  useEffect(() => {
    // videosService.getAllVideos();
    // videosService.createVideo({
    //   title: "test",
    //   description: "test",
    //   video_url: "test",
    // });
    // videosService.getSingleVideo("D7K9fE7HFARIa9V6wrB3");
    // D7K9fE7HFARIa9V6wrB3
    // videosService.editVideo({
    //   video_id: "D7K9fE7HFARIa9V6wrB3",
    //   title: "testchange",
    //   description: "testchange",
    // });
    videosService.getVideoComments("D7K9fE7HFARIa9V6wrB3");
    // videosService.createComment({
    //   video_id: "D7K9fE7HFARIa9V6wrB3",
    //   content: "first comment",
    //   user_id: "ted",
    // });
  }, []);

  const [videos, setVideos] = useState<Video[]>([]);
  // const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    clearFormData();
    setIsDialogOpen(true);
  };

  const fetchVideos = useCallback(async () => {
    try {
      const videos = await videosService.getAllVideos();
      setVideos(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast.error("Videos Failed to Load");
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await videosService.createVideo(formData);
      await fetchVideos();
      setIsDialogOpen(false);
      toast.success("Video added!");
    } catch (error) {
      console.error("Error creating video:", error);
      toast.error("Failed to save.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-10">
      <div className="flex justify-between p-10">
        <h1 className="text-xl font-semibold">homepage</h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button variant="outline" onClick={openDialog}>
            Add Video <Plus />
          </Button>

          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader className="mb-4">
                <DialogTitle>Add Video</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Video Name</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter video name"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Video Description</Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Enter video description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="video_url">Video URL</Label>
                  <Input
                    id="video_url"
                    name="video_url"
                    placeholder="Enter video URL"
                    value={formData.video_url}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Add Video</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex justify-center px-4 sm:px-6 lg:px-10 py-8">
        <div className="grid w-full max-w-6xl gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {videos.length === 0 && (
            <div className="col-span-full text-center text-gray-500 text-lg py-16 border rounded-lg w-full bg-white dark:bg-neutral-900 shadow-sm">
              No videos yet — create one to get started 🎬
            </div>
          )}

          {videos.map((video) => (
            <Link
              key={video.id}
              href={`/video/${video.id}`}
              className="w-full max-w-[350px] transition-transform transform hover:scale-[1.02] hover:brightness-105"
            >
              <div className="pointer-events-none flex flex-col border rounded-xl shadow-sm hover:shadow-md overflow-hidden bg-white dark:bg-neutral-900 cursor-pointer transition-all duration-300 ease-out">
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

                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {video.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      {new Date(video.created_at).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                    <span>{video.num_comments} comments</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
