import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  containerClassName?: string;
  placeholder?: any;
  label?: string;
  allowClear?: boolean;
  onClear?: () => void;
}

const ButtonComponent = ({ className, ...props }: Props, ref: React.Ref<HTMLButtonElement>) => {
  const baseClassName =
    "bg-[#FFEB80] text-[#556CBB] font-medium text-xl p-3 px-4 rounded-xl outline-none focus:outline-4 ";

  return (
    <button
      {...props}
      ref={ref}
      className={`${baseClassName} ${className}`}
    />
  );
};

const Button = React.forwardRef<HTMLButtonElement, Props>(ButtonComponent);

export default Button;