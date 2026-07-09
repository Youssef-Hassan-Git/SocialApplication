"use client";
import { useRouter } from "next/navigation";
import { Posts } from "../_interfaces/PostsInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../lib/Redux/ReduxStore";
import { useEffect, useState } from "react";
import {
  createComment,
  deletePost,
  getLikes,
  getMyPosts,
  getPosts,
  likePost,
  sharePost,
} from "../lib/Redux/PostsSlice";
import toast from "react-hot-toast";

import { getProfile } from "../lib/Redux/ProfileSlice";
interface PostCardProps {
  postDetails: Posts;
  showComments?: boolean;
}
export default function PostCard({ postDetails, showComments }: PostCardProps) {
  const router = useRouter();
  const handleViewPost = (id: string) => {
    router.push(`/post/${id}`);
  };
  const comments = useSelector((state: RootState) => state.postsSlice.comments);
  const user = useSelector((state: RootState) => state.profileSlice.user);
  const [content, setContent] = useState<any>("");
  const dispatch = useDispatch<AppDispatch>();
  const handleShare = async () => {
    const res = await dispatch(
      sharePost({
        postId: postDetails.id,
        body: `Sharing this great post @${postDetails.user.username}`,
      }),
    );

    if (sharePost.fulfilled.match(res)) {
      toast.success("Post shared successfully");
    } else {
      toast.error((res.payload as string) || "Failed to share");
    }
  };
  const handleSendComment = async () => {
    if (!content.trim()) return;

    const res = await dispatch(
      createComment({
        postId: postDetails.id,
        content,
      }),
    );
    if (createComment.fulfilled.match(res)) {
      toast.success("Comment created successfully");
      dispatch(getPosts(30));
      if (user?._id) {
        dispatch(getMyPosts(user._id));
      }
    } else {
      toast.error("Failed to create comment");
    }
    setContent("");
  };

  const handleLike = async (postId: string) => {
    const res = await dispatch(likePost(postId));

    console.log("LIKE RESPONSE:", res);

    if (likePost.fulfilled.match(res)) {
      dispatch(getPosts(30));
      if (user?._id) {
        dispatch(getMyPosts(user._id));
      }
      toast.success("Done");
    } else {
      toast.error((res.payload as string) || "Failed");
    }
  };

  const handleDeletePost = (postId: string) => {
    dispatch(deletePost(postId as any));
    toast.success("Post deleted successfully");
  };

  return (
    /* Card Container */
    <div className="md:max-w-7xl max-w-lg  mx-auto shadow-xl bg-white border-2 border-fuchsia-200 rounded-sm font-sans">
      {/* 1. Header Row */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center space-x-3">
          {/* Circular Avatar Badge */}
          <div className="w-10 h-10 rounded-full bg-blue-200 text-white flex items-center justify-center font-semibold text-lg">
            <img
              src={postDetails.user.photo}
              alt={postDetails.user.name + " image"}
              className="rounded"
            />
          </div>
          <div>
            {/* Title & Date */}
            <h3 className="text-[15px] font-medium text-gray-800 leading-tight">
              {postDetails.user.name}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {new Date(postDetails.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        {/* Top Right Options Menu Trigger */}
        {postDetails.user._id === user?._id && (
          <button
            onClick={() => handleDeletePost(postDetails.id)}
            className="flex items-center gap-2 text-red-500 hover:text-white hover:bg-red-500 px-3 py-2 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7L18.133 19.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
        )}
      </div>

      {/* 2. Text Content */}
      <div className="px-4 py-2 text-sm text-gray-600 leading-relaxed">
        <p>{postDetails.body}</p>
      </div>

      {!!postDetails.image && (
        /* 3. Image Area */
        <div className="w-full bg-gray-100 min-h-62.5 flex items-center justify-center text-gray-400 text-sm border-y border-gray-100">
          <div className="flex items-center space-x-2">
            <img
              src={postDetails.image}
              alt={postDetails.user.name + " image"}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* 4. Action Row */}
      <div className="p-2 flex items-center justify-between text-gray-500">
        <div className="flex space-x-2">
          {/* Like Button */}
          <button
            onClick={() => handleLike(postDetails.id)}
            className="p-2 rounded-full hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.106-1.79l.05-.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
          </button>
          <span className="mt-1.5">{postDetails.likesCount}</span>

          {/* Comment Button */}
          <button className="p-2 rounded-full hover:bg-gray-100 hover:text-gray-700 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </button>
          <span className="mt-1.5">{postDetails.commentsCount}</span>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="p-2 rounded-full hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.684 10.742l4.684-2.342m0 5.2l-4.684-2.343m8.422-4.686a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM12 18.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
        </button>
      </div>

      {/* comment input */}
      <div className="flex items-center gap-3 mb-3 ms-8">
        <img
          src={postDetails.user.photo} // replace with logged-in user later
          alt="Your avatar"
          className="w-8 h-8 rounded-full object-cover"
        />

        <input
          type="text"
          placeholder="Write a comment..."
          className="flex w-[80%] rounded-full bg-gray-100 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendComment();
            }
          }}
        />

        <button
          onClick={handleSendComment}
          className="text-blue-600 font-medium hover:text-blue-700"
        >
          Post
        </button>
      </div>

      <div className="border-t border-gray-300 px-4 py-3">
        {showComments ? (
          <div className="space-y-4">
            {comments?.map((comment) => (
              <div key={comment._id} className="flex gap-3">
                <img
                  src={comment.commentCreator.photo}
                  alt={comment.commentCreator.name}
                  className="w-8 h-8 rounded-full object-cover"
                />

                <div className="bg-gray-100 rounded-2xl px-3 py-2 flex-1">
                  <p className="font-semibold text-sm">
                    {comment.commentCreator.name}
                  </p>

                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          postDetails.topComment && (
            <div>
              <div className="flex gap-3">
                <img
                  src={postDetails.topComment.commentCreator.photo}
                  className="w-8 h-8 rounded-full object-cover"
                />

                <div className="bg-gray-100 rounded-2xl px-3 py-2 flex-1">
                  <p className="font-semibold text-sm">
                    {postDetails.topComment.commentCreator.name}
                  </p>

                  <p className="text-sm text-gray-700">
                    {postDetails.topComment.content}
                  </p>
                </div>
              </div>

              {postDetails.commentsCount > 0 && (
                <button
                  onClick={() => handleViewPost(postDetails.id)}
                  className="mt-2 ml-11 text-sm text-gray-500"
                >
                  View all {postDetails.commentsCount} comments
                </button>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
