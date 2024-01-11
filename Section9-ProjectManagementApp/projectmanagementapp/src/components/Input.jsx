import React from "react";

export default function Input({label,  isTextarea, ...props }) {
  return (
    <p>
      <label htmlFor="">{label}</label>
      {isTextarea ? <textarea {...props}/> : <input {...props} />}
    </p>
  );
}
