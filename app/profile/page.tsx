"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, uploadPhoto } from "../lib/Redux/ProfileSlice";
import { RootState } from "../lib/Redux/ReduxStore";
import Loading from "../loading";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import ProtectedRoute from "../Components/ProtectedRoute";
import Link from "next/link";
export default function Page() {
  const dispatch = useDispatch<any>();

  const user = useSelector((state: RootState) => state.profileSlice.user);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    if (file) {
      formData.append("photo", file);
    }

    const res = await dispatch(uploadPhoto(formData));
    if (uploadPhoto.fulfilled.match(res)) {
      toast.success("Profile image created successfully");
    } else {
      toast.error("Failed to upload image");
    }
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <>
      <ProtectedRoute>
        {!user ? (
          <Loading />
        ) : (
          <div className="pt-25  bg-blue-50 min-h-screen w-full   ">
            <div className="flex justify-center">
              <div className="md:w-[75%] lg:w-[60%] mb-18 border-2  border-fuchsia-200  rounded-lg bg-white shadow-lg flex justify-center items-center md:items-start flex-col  ">
                <img
                  src={user.photo}
                  alt="cover"
                  className="w-full h-58 md:h-64 object-center"
                />
                <div className="p-5 flex justify-center  items-center md:items-start flex-col md:flex-row w-full">
                  {/* left */}
                  <div className="flex flex-col items-center w-[50%] ">
                    <label
                      htmlFor="image"
                      className="font-semibold cursor-pointer"
                    >
                      {" "}
                      Change Photo
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="size-24 rounded-full object-cover"
                      />
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden "
                    />

                    {/* large */}
                    <div className="flex flex-row md:ms-40 justify-center  ">
                      <div className="bg-blue-50 border border-blue-100 rounded p-3 mt-5 hidden md:block w-fit content-center">
                        <p className="mb-3">📧 Email: {user.email}</p>
                        <p>
                          Date of birth:{" "}
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                        <p>
                          Gender: {user.gender}{" "}
                          {user.gender === "male" ? (
                            <FontAwesomeIcon
                              icon={faMars}
                              className="text-blue-500 text-xl mt-3"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faVenus}
                              className="text-pink-500 text-xl mt-3"
                            />
                          )}
                        </p>

                        <p className="mt-3">
                          Joined at:{" "}
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className=" md:flex md:flex-row  rounded p-3 mt-5 hidden h-auto items-center   w-fit">
                        <p className="mb-3 border border-blue-200 bg-blue-100 p-2 ">
                          No. of Followers: {user.followersCount}
                        </p>
                        <p className="mb-3 border border-blue-200 bg-blue-100 p-2">
                          No. of Following: {user.followingCount}
                        </p>
                        <p className="mb-3 border border-blue-200 bg-blue-100 p-2">
                          No. of Bookmarks: {user.bookmarksCount}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* right */}
                  <div className="flex flex-col mt-5 justify-start">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-500">@{user.username}</p>
                      <Link href="changepassword" className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                      🔒 Change Password
                    </Link>
                  </div>
                  {/* small */}
                  <div className="bg-blue-50 border border-blue-100 rounded p-3 mt-5 block md:hidden  text-center w-fit">
                    <p>
                      Date of birth:{" "}
                      {new Date(user.dateOfBirth).toLocaleDateString()}
                    </p>
                    <p>
                      Gender: {user.gender}{" "}
                      {user.gender === "male" ? (
                        <FontAwesomeIcon
                          icon={faMars}
                          className="text-blue-500 text-xl mt-3"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faVenus}
                          className="text-pink-500 text-xl mt-3"
                        />
                      )}
                    </p>
                    <p className="mb-3 mt-3 md:mt-0">📧 Email: {user.email}</p>
                    <p>
                      Date of birth:{" "}
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>

                    <p className="mt-3">
                      Joined at: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mb-3 mt-5 border border-blue-200 bg-blue-100 p-2">
                      No. of Followers: {user.followersCount}
                    </p>
                    <p className="mb-3 border border-blue-200 bg-blue-100 p-2">
                      No. of Following: {user.followingCount}
                    </p>
                    <p className="mb-3 border border-blue-200 bg-blue-100 p-2">
                      No. of Bookmarks: {user.bookmarksCount}
                    </p>

                    <div className=" md:flex md:flex-row  rounded p-3 mt-5 hidden w-fit content-center">
                      <p className="mb-3 border border-blue-200 bg-blue-100 p-2">
                        No. of Followers: {user.followersCount}
                      </p>
                      <p className="mb-3 border border-blue-200 bg-blue-100 p-2">
                        No. of Following: {user.followingCount}
                      </p>
                      <p className="mb-3 border border-blue-200 bg-blue-100 p-2">
                        No. of Bookmarks: {user.bookmarksCount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </ProtectedRoute>
    </>
  );
}
