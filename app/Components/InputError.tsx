import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function InputError({Form, field}: any) {
  return (
              <div className="flex flex-row items-center gap-2 p-2 text-red-500">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="w-4 h-4 shrink-0"
                />
                <p className="text-sm font-medium">
                  {Form.errors[field]}
                </p>
              </div>
  )
}
