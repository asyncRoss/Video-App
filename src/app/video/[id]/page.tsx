"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";
import videosService, { Comment, Video } from "@/services/videoService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Comments({ videoId }: { videoId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!videoId) return;

    const fetchComments = async () => {
      try {
        const commentData = await videosService.getVideoComments(videoId);
        setComments(commentData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchComments();
  }, [videoId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await videosService.createComment({
        video_id: videoId,
        user_id: "testing_testing",
        content: newComment.trim(),
      });
      setNewComment("");
      const updated = await videosService.getVideoComments(videoId);
      setComments(updated);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center lg:items-start lg:border-l lg:pl-8 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-2 mb-4 w-full max-w-[600px] mx-auto">
        <Input
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button onClick={handleAddComment}>Post</Button>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 w-full max-w-[600px] mx-auto">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="border rounded-lg p-3 shadow-sm bg-white text-left"
            >
              <p className="text-gray-800 text-sm">{comment.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                by {comment.user_id} •{" "}
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function VideoPage() {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchVideo = async () => {
      try {
        setLoading(true);
        const data = await videosService.getSingleVideo(id as string);
        setVideo(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center">{error}</div>;
  if (!video) return <div className="p-10 text-center">No video found.</div>;

  return (
    <div className="grid justify-center grid-cols-1 xl:grid-cols-2 gap-8 p-6 max-w-8xl mx-auto text-center">
      <div className="flex flex-col items-center lg:items-start">
        <div className="w-full max-w-[900px] aspect-video rounded-lg overflow-hidden shadow mx-auto">
          <ReactPlayer
            src={video.video_url}
            light={true}
            playIcon
            controls
            width="100%"
            height="100%"
          />
        </div>
        <h1 className="text-2xl font-semibold mb-4 self-start lg:self-auto">
          {video.title}
        </h1>
        <p className="mt-4 text-gray-600 max-w-[600px] text-sm ">
          {video.description}
        </p>
      </div>

      {id && <Comments videoId={id as string} />}
    </div>
  );
}
