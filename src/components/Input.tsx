import React, { forwardRef } from "react";
import './components.css'
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  placeholder?: string;
  label?: string;
  allowClear?: boolean;
  className?: string;
  theme?: string;
  onClear?: () => void;
}

const Input = forwardRef<HTMLInputElement, Props>(({ className,theme, ...props }, ref) => {
  let baseClassName = "input-placeholder bg-white text-gray-600 p-3 px-4 rounded-xl w-full p-4 h-14 focus:border-blue-[#597CE0] focus:outline-gray-400 font-normal focus:text-gray-500 ";

  if (theme == 'border') { baseClassName += "border" }
  return  (
  <>
{props.label &&    <p className="font-thin text-gray-500 ">{props.label}</p>
}    <input  {...props} ref={ref} className={`${baseClassName} ${className}`} />
  </>
  );
});

export default Input;