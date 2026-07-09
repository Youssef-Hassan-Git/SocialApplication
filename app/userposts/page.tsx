"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../lib/Redux/ReduxStore";
import { useEffect } from "react";
import { deletePost, getMyPosts, getPosts } from "../lib/Redux/PostsSlice";
import PostCard from "../Components/PostCard";
import Loading from "../loading";
import CreatePost from "../Components/CreatePost";
import { getProfile } from "../lib/Redux/ProfileSlice";
import ProtectedRoute from "../Components/ProtectedRoute";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  //   const allPosts = useSelector((state: RootState) => state.postsSlice.allPosts);
  //   const userData = useSelector((state: RootState)=> state.authSlice.userData)
  const user = useSelector((state: RootState) => state.profileSlice.user);
  const myPosts = useSelector((state: RootState) => state.postsSlice.myPosts);

  useEffect(() => {
    dispatch(getProfile());
  }, []);
  useEffect(() => {
    if (user?._id) {
      dispatch(getMyPosts(user._id));

      console.log(user._id);
    }
  }, [user, dispatch]);

  return (
    <>
    <ProtectedRoute>
          {myPosts ? (
        <div className="min-h-screen  bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 py-6 mt-15">
            {/* layout */}
            <div className="flex justify-center  ">
              <div className="w-full md:w-[60%] lg:w-[50%]">
                {/* createpost */}

                <CreatePost name={""} />
                {/* show posts */}

                {myPosts?.map((post) => {
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
