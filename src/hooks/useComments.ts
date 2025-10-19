"use client";

import { useEffect, useState } from "react";
import videosService, { Comment } from "@/services/videoService";

export default function useComments(videoId: string) {
  const [comments, setComments] = useState<Comment[]>([]);

  const [loadingFetch, setLoadingFetch] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const [errorFetch, setErrorFetch] = useState<string | null>(null);
  const [errorAdd, setErrorAdd] = useState<string | null>(null);

  const fetchComments = async () => {
    if (!videoId) return;
    setLoadingFetch(true);
    setErrorFetch(null);
    try {
      const data = await videosService.getVideoComments(videoId);
      setComments(data);
    } catch {
      setErrorFetch("Failed to load comments.");
    } finally {
      setLoadingFetch(false);
    }
  };

  const addComment = async (content: string) => {
    if (!content.trim()) return;
    setLoadingAdd(true);
    setErrorAdd(null);
    try {
      await videosService.createComment({
        video_id: videoId,
        content: content.trim(),
      });
      await fetchComments();
    } catch {
      setErrorAdd("Failed to post comment.");
    } finally {
      setLoadingAdd(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  return {
    comments,
    fetchComments,
    addComment,
    loadingFetch,
    loadingAdd,
    errorFetch,
    errorAdd,
  };
}
