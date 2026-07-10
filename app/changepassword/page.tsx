"use client";

import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import ButtonLoader from "../Components/ButtonLoader";
import ErrorMessageDisplay from "../Components/ErrorMessage";
import InputError from "../Components/InputError";
import InputText from "../Components/InputText";

import { RootState } from "../lib/Redux/ReduxStore";
import { AppDispatch } from "../lib/Redux/ReduxStore";
import {
  changePassword,
  clearError,
} from "../lib/Redux/AuthSlice";

import toast from "react-hot-toast";


export default function page() {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const isLoading = useSelector(
    (state: RootState) => state.authSlice.isLoading
  );

  const isSuccess = useSelector(
    (state: RootState) => state.authSlice.isSuccess
  );

  const errorMessage = useSelector(
    (state: RootState) => state.authSlice.ErrorMessage
  );


  const changePasswordBody = {
    password: "",
    newPassword: "",
  };


  const handleChangePasswordSubmit = async (values: {
    password: string;
    newPassword: string;
  }) => {
    try {
      await dispatch(changePassword(values)).unwrap();

      toast.success("Password changed successfully");

      setTimeout(() => {
        router.push("/profile");
      }, 1500);

    } catch (err) {
      console.log(err);
    }
  };


  const changePasswordSchema = yup.object({
    password: yup
      .string()
      .required("Current password is required"),

    newPassword: yup
      .string()
      .required("New password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .min(6, "Password must be at least 6 characters"),
  });


  const changePasswordForm = useFormik({
    initialValues: changePasswordBody,
    onSubmit: handleChangePasswordSubmit,
    validationSchema: changePasswordSchema,
  });


  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage, dispatch]);


  return (
    <div className="h-screen flex justify-center items-center border border-blue-100 bg-blue-50">
      <div className="max-w-md w-full bg-white border-2 border-fuchsia-200 rounded-2xl shadow-xl p-8">

        {/* HEADER */}

        <h1 className="text-3xl font-bold text-center text-blue-500">
          Change Password
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Update your account password
        </p>


        {/* FORM */}

        <form onSubmit={changePasswordForm.handleSubmit}>

          {/* current password */}

          <InputText
            label="Current Password"
            name="password"
            type="password"
            placeholder="Enter your current password"
            value={changePasswordForm.values.password}
            onChange={changePasswordForm.handleChange}
            onBlur={changePasswordForm.handleBlur}
          />

          {changePasswordForm.touched.password &&
            changePasswordForm.errors.password && (
              <InputError
                Form={changePasswordForm}
                field="password"
              />
            )}



          {/* new password */}

          <InputText
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="Enter your new password"
            value={changePasswordForm.values.newPassword}
            onChange={changePasswordForm.handleChange}
            onBlur={changePasswordForm.handleBlur}
          />

          {changePasswordForm.touched.newPassword &&
            changePasswordForm.errors.newPassword && (
              <InputError
                Form={changePasswordForm}
                field="newPassword"
              />
            )}



          <button
            type="submit"
            disabled={isLoading}
            className={`mt-4 w-[80%] mx-auto block rounded-lg border-2 px-2 py-3 font-semibold transition-colors duration-200 ${
              isLoading
                ? "bg-blue-300 border-blue-300 text-white cursor-not-allowed"
                : "bg-blue-500 border-blue-600 text-white hover:bg-white hover:text-blue-500 cursor-pointer"
            }`}
          >
            {isLoading ? (
              <ButtonLoader />
            ) : (
              "Change Password"
            )}
          </button>


          {errorMessage ? (
            <ErrorMessageDisplay message={errorMessage} />
          ) : (
            ""
          )}

        </form>

      </div>
    </div>
  );
}