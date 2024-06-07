import React from "react";
import { Select } from "antd";
import './components.css';

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
      className={`custom-select ${baseClassName} ${className} outline-none`}
        ref={ref}
        placeholder={placeholder}
        allowClear={allowClear}
        style={{borderRadius:100}}
        {...rest}
      >
        <Select.Option value="sample">Sample</Select.Option>
      </Select>
    </>
  );
});

export default CustomSelect;
