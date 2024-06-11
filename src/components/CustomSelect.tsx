import { useFormContext } from "react-hook-form";
import React from "react";
import { Select } from "antd";

const { Option } = Select;

interface InputProps {
  name: string;
  label?: string;
  onChange?: (value: string) => void;
  type?: string;
  required?: boolean;
  children?: any;
  className?:string;
  placeholder?:string;
}

const CustomSelect: React.FC<InputProps> = ({
  name,
  label,
  required,
  onChange,
  children,
  placeholder,
  className,
  ...rest
}) => {
  const { register, setValue } = useFormContext();

  const handleChange = (value: any) => {
    setValue(name, value);
    if (onChange) {
      onChange(value);
    }
  };

  React.useEffect(() => {
    register(name, { required });
  }, [register, name, required]);

  const baseClassName = "w-full flex flex-cols mt-2 h-12";

  return (
    <div className="input-wrapper">
      {label && <p className="font-thin pl-2 text-gray-500">{label}</p>}{" "}
      <Select
        className={` ${baseClassName} ${className}`}
        id={name}
        onChange={handleChange}
        placeholder={placeholder}
        {...rest}
      >
        {children}
      </Select>
    </div>
  );
};

export default CustomSelect;
