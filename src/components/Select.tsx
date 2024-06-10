import React, { forwardRef } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import './components.css';

interface Option {
  value: string;
  label: string;
}

interface Props extends SelectProps<string> {
  containerClassName?: string;
  label?: string;
  options?: Option[];
  onChange?: (value: string) => void;
}

const CustomSelect = forwardRef<any, Props>((props, ref) => {
  const {
    containerClassName,
    label,
    options,
    className,
    onChange,
    children, // Accept children prop
    ...rest
  } = props;

  const baseClassName = 'w-full flex flex-cols ';

  const handleSelectChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={containerClassName}>
      {label && <label className="custom-select-label">{label}</label>}
      <Select
        className={` ${baseClassName} ${className}`}
        ref={ref}
        style={{ borderRadius: 100 }}
        onChange={handleSelectChange}
        {...rest}
      >
        {children} {/* Render children if options are not provided */}
      </Select>
    </div>
  );
});

export default CustomSelect;
