"use client";
import { useState } from "react";
import videosService from "@/services/videoService";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus } from "lucide-react";

function VideoForm({
  formData,
  handleChange,
}: {
  formData: { title: string; description: string; video_url: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
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
  );
}

export default function AddVideoDialog({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
  });

  const clearFormData = () => {
    setFormData({ title: "", description: "", video_url: "" });
  };

  const openDialog = () => {
    clearFormData();
    setOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await videosService.createVideo(formData);
      toast.success("Video added!");
      setOpen(false);
      onSuccess();
    } catch {
      toast.error("Failed to save video");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" onClick={openDialog}>
        Add Video <Plus />
      </Button>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-4">
            <DialogTitle>Add Video</DialogTitle>
          </DialogHeader>

          <VideoForm formData={formData} handleChange={handleChange} />

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
  );
}
