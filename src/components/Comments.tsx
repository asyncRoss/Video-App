"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import useComments from "@/hooks/useComments";

export default function Comments({ videoId }: { videoId: string }) {
  const {
    comments,
    addComment,
    loadingFetch,
    loadingAdd,
    errorFetch,
    errorAdd,
  } = useComments(videoId);

  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (errorFetch) toast.error(errorFetch);
  }, [errorFetch]);

  useEffect(() => {
    if (errorAdd) toast.error(errorAdd);
  }, [errorAdd]);

  return (
    <div className="flex flex-col items-center xl:items-start lg:pl-8 max-w-4xl mx-auto w-full">
      {/* Input row */}
      <div className="flex items-center gap-2 mb-4 w-full max-w-[600px] mx-auto">
        <Input
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
        />
        <Button
          onClick={() => {
            addComment(newComment);
            setNewComment("");
          }}
          disabled={loadingAdd}
        >
          {loadingAdd ? "Posting..." : "Post"}
        </Button>
      </div>

      {/* Comments list */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 w-full max-w-[600px] mx-auto">
        {loadingFetch ? (
          <p className="text-gray-500 text-sm">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="border border-gray-200 dark:border-neutral-800 rounded-lg p-3 shadow-sm bg-white/95 dark:bg-neutral-900/90 text-left"
            >
              <p className="text-gray-900 dark:text-gray-100 text-sm">
                {comment.content}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
