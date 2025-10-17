import apiClient from "@/services/apiClient";

export interface Video {
  created_at: string;
  video_url: string;
  user_id: string;
  title: string;
  description: string;
  num_comments: number;
  id: string;
}

export interface Comment {
  created_at: string;
  content: string;
  user_id: string;
  video_id: string;
  id: string;
}

export interface CreateVideoParams {
  description: string;
  video_url: string;
  title: string;
}

interface Success {
  success: string;
}

export interface EditVideoParams {
  video_id: string;
  title: string;
  description: string;
}

export interface CreateCommentParams {
  video_id: string;
  content: string;
  user_id: string;
}

const user_id = "testing_testing";

// videos
async function getAllVideos(): Promise<Video[]> {
  const res = await apiClient.get("/videos", { params: { user_id } });
  return res.data?.videos ?? [];
}

async function getSingleVideo(video_id: string): Promise<Video> {
  const res = await apiClient.get("/videos/single", { params: { video_id } });
  return res.data;
}

async function createVideo(body: CreateVideoParams): Promise<Success> {
  const bodyWithUserId = { ...body, user_id };
  const res = await apiClient.post("/videos", bodyWithUserId);
  return res.data;
}

async function editVideo(body: EditVideoParams): Promise<Success> {
  const res = await apiClient.put("/videos", body);
  return res.data;
}

// comments
async function getVideoComments(video_id: string): Promise<Comment[]> {
  const res = await apiClient.get("/videos/comments", { params: { video_id } });
  return res.data?.comments ?? [];
}

async function createComment(body: CreateCommentParams): Promise<Success> {
  const res = await apiClient.post("/videos/comments", body);
  return res.data;
}

const videosService = {
  getAllVideos,
  getSingleVideo,
  createVideo,
  editVideo,
  getVideoComments,
  createComment,
};

export default videosService;
