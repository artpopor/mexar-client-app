import React, { forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  placeholder?: string;
  label?: string;
  allowClear?: boolean;
  className?: string;
  onClear?: () => void;
}

const Input = forwardRef<HTMLInputElement, Props>(({ className, ...props }, ref) => {
  const baseClassName = "bg-white text-gray-600 p-3 px-4 rounded-xl w-full outline-none";
  return <input {...props} ref={ref} className={`${baseClassName} ${className}`} />;
});

export default Input;