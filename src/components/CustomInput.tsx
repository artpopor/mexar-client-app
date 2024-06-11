import { useFormContext } from "react-hook-form";
import React from "react";

interface InputProps {
  name: string;
  label?: string;
  onChange?: (value: string) => void;
  type?: string;
  required?: boolean;
  defaultValue?: number;
  placeholder?:string;
  className?: string;
  value?:string;
}

const CustomInput: React.FC<InputProps> = ({
  name,
  label,
  type,
  required,
  defaultValue,
  placeholder,
  value,
  onChange,
  className,
  ...rest
}) => {
  const { register } = useFormContext();

  if (!register) {
    throw new Error("InputField must be used within a FormProvider");
  }
  const inputClassName = "p-2 border rounded-xl my-1 text-center w-full";
  return (
    <div className="input-wrapper">
            {label && <p className="font-thin pl-2 text-gray-500">{label}</p>}{" "}
            <input
        className={`${className} ${inputClassName}`}
        id={name}
        placeholder={placeholder}
        step="0.0000001"
        type={type || "text"}
        {...register(name, {
          required: required,
          onChange: (e) => {
            if (onChange) onChange(e.target.value);
          },
        })}
        defaultValue={defaultValue}
        value={value}
        {...rest}

      />
    </div>
  );
};

export default CustomInput;
