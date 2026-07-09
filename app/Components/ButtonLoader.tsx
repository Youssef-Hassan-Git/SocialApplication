import React from "react";

import { Oval } from "react-loader-spinner";

export default function ButtonLoader() {
  return (
    <div className="flex justify-center">
      <Oval
        height={20}
        width={20}
        color="#fff"
        secondaryColor="transparent"
        strokeWidth={5}
      />
    </div>
  );
}
