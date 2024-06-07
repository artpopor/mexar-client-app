import React from "react";
import { Select } from "antd";
interface Props {
  containerClassName?: string;
  placeholder?: string;
  label?: string;
  allowClear?: boolean;
  className?:string;
  onClear?: () => void;
}
import './components.css'

const CustomSelect = React.forwardRef<any, Props>((props, ref) => {
  const {
    containerClassName,
    placeholder,
    label,
    allowClear,
    onClear,className,
    ...rest
  } = props;
  const baseClassName = 'w-full'
  return (
    <>
      <Select
      className={`${baseClassName} ${className} outline-none`}
        ref={ref}
        placeholder={placeholder}
        allowClear={allowClear}
        {...rest}
      >
        <Select.Option value="sample">Sample</Select.Option>
      </Select>
    </>
  );
});

export default CustomSelect;
