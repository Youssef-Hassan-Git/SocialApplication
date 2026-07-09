import React, { useEffect, useState } from "react";
import { faFileImport, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../lib/Redux/ReduxStore";
import { createPost } from "../lib/Redux/CreatePostSlice";
import { getMyPosts, getPosts } from "../lib/Redux/PostsSlice";
import { toast } from "react-hot-toast";

interface CreatPostProps {
  name: string;
}
export default function CreatePost({ name }: CreatPostProps) {
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  
    const user = useSelector((state: RootState) => state.profileSlice.user);

  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("body", body);

    if (image) {
      formData.append("image", image);
    }

    const result = await dispatch(createPost(formData));
    if (createPost.fulfilled.match(result)) {
      toast.success("Post created successfully");
      dispatch(getPosts(30));
      dispatch(getMyPosts(user!._id));
      setBody("");
      setImage(null);
    } else {
      toast.error("Failed to create post");
    }
  };
useEffect(() => {
  if (user?._id) {
    dispatch(getMyPosts(user._id));

    console.log(user._id);
    
  }
}, [user, dispatch]);
  return (
    <>
      <div className="bg-white border-2 border-fuchsia-200 rounded-lg shadow-lg  p-4">
        <textarea
          placeholder={`What's on your mind?, ${name}`}
          className="w-full border border-gray-600 min-h-45 resize-none  rounded p-3 shadow-lg"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <div className="mt-6 mb-4 flex flex-row justify-center">
          <label
            htmlFor="image"
            className="flex cursor-pointer flex-row items-center hover:opacity-80"
          >
            <p className="text-lg font-semibold me-2">Upload Image</p>
            <FontAwesomeIcon
              icon={faImage}
              style={{ width: "30px", height: "30px" }}
            />
            <div className="font-semibold text-blue-400 ms-2 ">
              {image && "Image Uploaded."}
            </div>
          </label>
          <input
            type="file"
            className="hidden"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex justify-center mt-5 shadow-lg pb-4 rounded">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-bold  px-4 py-2 rounded-lg  border-3 border-blue-600 hover:border-blue-400 hover:bg-blue-600 transition-colors duration-200"
          >
            Create Post
          </button>
        </div>
      </div>
    </>
  );
}
