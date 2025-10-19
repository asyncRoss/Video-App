"use client";
import { useState, useEffect } from "react";
import videosService, { Video } from "@/services/videoService";

export default function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchVideos() {
    setLoading(true);
    setError(null);
    try {
      const res = await videosService.getAllVideos();
      setVideos(res);
    } catch {
      setError("Videos failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  return { videos, loading, error, refetchVideos: fetchVideos };
}
