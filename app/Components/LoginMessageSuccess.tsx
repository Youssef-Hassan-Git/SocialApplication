import React from "react";

export default function LoginMessageSuccess() {
  return (
    <div
      className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 m-3"
      role="alert"
    >
      <i className="fa-solid fa-check text-white bg-green-500 rounded-md p-1.5 me-2"></i>
      <div>
        <p>Login successfully!</p>
      </div>
    </div>
  );
}
