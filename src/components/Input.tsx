import React, { forwardRef } from "react";
import './components.css'
import { Props } from "./Input.types";


const Input = forwardRef<HTMLInputElement, Props>(({ className,theme, ...props }, ref) => {
  let baseClassName = "bg-white text-gray-600 p-3 px-4 rounded-xl w-full p-4 h-14 focus:border-blue-[#597CE0] focus:outline-gray-400 font-normal focus:text-gray-500 ";

  if (theme == 'border') { baseClassName += "border" }
  return  (
  <>
    <p className="font-thin text-gray-500">{props.label}</p>
    <input  {...props} ref={ref} className={`${baseClassName} ${className}`} />
  </>
  );
});

export default Input;