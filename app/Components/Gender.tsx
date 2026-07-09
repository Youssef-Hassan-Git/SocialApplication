import React from 'react'

export default function Gender({registerForm}: any) {
  return (
<div className="mt-4">
  <label className="block text-center mb-2 text-md font-medium text-gray-700">
    Gender
  </label>

  <div className="flex justify-center gap-6">
    <label className="flex  items-center gap-2">
      <input
        type="radio"
        name="gender"
        value="male"
        checked={registerForm.values.gender === "male"}
        onChange={registerForm.handleChange}
      />
      Male
    </label>

    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="gender"
        value="female"
        checked={registerForm.values.gender === "female"}
        onChange={registerForm.handleChange}
      />
      Female
    </label>
  </div>
</div>
  )
}
