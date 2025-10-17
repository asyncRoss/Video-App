"use client";
import videosService from "@/services/videoService";
import { useEffect } from "react";

export default function Home() {
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
    // videosService.getVideoComments("D7K9fE7HFARIa9V6wrB3");
    // videosService.createComment({
    //   video_id: "D7K9fE7HFARIa9V6wrB3",
    //   content: "first comment",
    //   user_id: "ted",
    // });
  }, []);
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      homepage
    </div>
  );
}
