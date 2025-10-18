"use client";
import { useState, useEffect } from "react";
import videosService from "@/services/videoService";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
  });

  useEffect(() => {
    videosService.getAllVideos();
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
    // videosService.getVideoComments("D7K9fE7HFARIa9V6wrB3");
    // videosService.createComment({
    //   video_id: "D7K9fE7HFARIa9V6wrB3",
    //   content: "first comment",
    //   user_id: "ted",
    // });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await videosService.createVideo(formData);
      toast.success("Video added!");
    } catch (error) {
      console.error("Error creating video:", error);
      toast.error("Failed to save.");
    }
  };

  return (
    <div className="flex justify-between p-10">
      <h1 className="text-xl font-semibold">homepage</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            Add Video <Plus />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="mb-4">
              <DialogTitle>Add Video</DialogTitle>
              {/* <DialogDescription>add</DialogDescription> */}
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
  );
}
