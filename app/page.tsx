"use client";

import { useEffect, useState } from "react";
import PostCard from "./Components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, sharePost } from "./lib/Redux/PostsSlice";
import { AppDispatch, RootState } from "./lib/Redux/ReduxStore";
import { Posts } from "./_interfaces/PostsInterface";
import Loading from "./loading";
import CreatePost from "./Components/CreatePost";
import ProtectedRoute from "./Components/ProtectedRoute";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const allPosts = useSelector((state: RootState) => state.postsSlice.allPosts);
  const userData = useSelector((state: RootState) => state.authSlice.userData);

  useEffect(() => {
    dispatch(getPosts(30));
  }, []);

  return (
    <>
     <ProtectedRoute>
       {allPosts ? (
        <div className="min-h-screen  bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 py-6 mt-15">
            {/* layout */}
            <div className="flex justify-center  ">
              <div className="w-full md:w-[60%] lg:w-[50%]">
                {/* createpost */}

                <CreatePost name={userData?.name ?? ""} />
                {/* show posts */}

                {allPosts?.map((post) => {
                  return (
                    <div key={post.id} className="mb-6  mt-5">
                      <PostCard key={post.id} postDetails={post} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
     </ProtectedRoute>
    </>
  );
}
