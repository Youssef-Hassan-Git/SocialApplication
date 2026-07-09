"use client";
import PostCard from "@/app/Components/PostCard";
import { specificPost, getComments } from "@/app/lib/Redux/PostsSlice";
import { AppDispatch, RootState, store } from "@/app/lib/Redux/ReduxStore";
import Loading from "@/app/loading";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
export default function page() {
  const dispatch = useDispatch<AppDispatch>();

  const post = useSelector((store: RootState) => store.postsSlice.selectedPost);
  const comments = useSelector((state: RootState) => state.postsSlice.comments);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    dispatch(specificPost(id));
    dispatch(getComments(id));
  }, []);
  return (
    <div>
      {post ? (
        <div className="min-h-screen bg-gray-200 pt-25  ">
          <PostCard key={post.id} postDetails={post} showComments={true} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
