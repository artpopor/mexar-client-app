import { useFormContext } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { Select } from "antd";
import "./components.css";
const { Option } = Select;

interface InputProps {
  name: string;
  label?: string;
  onChange?: (value: any) => void;
  type?: string;
  required?: boolean;
  children?: any;
  className?: string;
  placeholder?: string;
  countries?: any[];
  value?: any;
  defaultValue?: any;
}

const CurSelectAndInput: React.FC<InputProps> = ({
  name,
  label,
  required,
  onChange,
  children,
  className,
  countries,
  value,
  placeholder,
  defaultValue,
  ...rest
}) => {
  const { register, setValue } = useFormContext();
  const [selectedValue, setSelectedValue] = useState(value?.code || "");
  const [inputValue, setInputValue] = useState(value?.amount || "");
  useEffect(() => {
    setSelectedValue(defaultValue?.code);
    setInputValue(defaultValue?.amount);
    setValue(name,{ code: defaultValue?.code, amount: defaultValue?.amount })
  }, [defaultValue]);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    const combinedValue = { code: value, amount: inputValue };
    setValue(name, combinedValue);
    if (onChange) {
      onChange(combinedValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    const combinedValue = { code: selectedValue, amount: newValue };
    setValue(name, combinedValue);
    if (onChange) {
      onChange(combinedValue);
    }
  };

  // useEffect(() => {
  //   register(name, { required });
  // }, [register, name, required, value]);

  const selectClassName =
    "select-currency w-full flex flex-cols h-12 self-center !w-[35%] ";
  const inputClassName =
    "border h-12 rounded-r-xl rounded-l-none self-center !w-full p-2";
  return (
    <div>
      {label && <p className="font-thin pl-2 text-gray-500">{label}</p>}{" "}
      <div className={`input-wrapper flex flex-rows my-2 ${className}`}>
        <Select
          className={selectClassName}
          id={name}
          onChange={handleSelectChange}
          placeholder={"country"}
          value={selectedValue}
          {...rest}
        >
          {countries?.map((country: any) => (
            <Select.Option key={country?.code} value={country?.code}>
              <div className="flex flex-cols gap-2 justify-center content-center self-center">
                <p>{country?.code}</p>
                <img
                  className="rounded-md w-5 h-5 self-center"
                  src={country?.flag}
                />
              </div>
            </Select.Option>
          ))}
        </Select>
        <input
          className={inputClassName}
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          type="number"
        />
      </div>
    </div>
  );
};

export default CurSelectAndInput;
