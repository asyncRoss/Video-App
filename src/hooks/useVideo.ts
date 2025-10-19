"use client";

import { useEffect, useState } from "react";
import videosService, { Video } from "@/services/videoService";

export default function useVideo(id?: string) {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchVideo = async () => {
      try {
        setLoading(true);
        const data = await videosService.getSingleVideo(id);
        setVideo(data);
      } catch {
        setError("Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  return { video, loading, error };
}
