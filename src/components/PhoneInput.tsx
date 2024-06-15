import { Space, Select } from "antd";
import React, { forwardRef } from "react";
import CountryCodeWithFlag from "../assets/CountryCodeWithFlag.json";
import './components.css';
import Input from "./Input";
interface PhoneValue {
  dialCode: string;
  phoneNumber: string;
}

interface Props {
  containerClassName?: string;
  placeholder?: string;
  label?: string;
  allowClear?: boolean;
  className?: string;
  onClear?: () => void;
  options?: [];
  value?: PhoneValue;
  onChange?: (value: PhoneValue) => void;
}

const PhoneInput = forwardRef<HTMLInputElement, Props>(
  ({ className, value = { dialCode: "+66", phoneNumber: "" }, onChange, ...props }, ref) => {
    const handleDialCodeChange = (dialCode: string) => {
      onChange?.({ ...value, dialCode });
    };

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.({ ...value, phoneNumber: e.target.value });
    };

    return (
      <div className="h-14 gap-0 flex flex-cols">
        <Select
          value={value.dialCode}
          onChange={handleDialCodeChange}
          className="h-14 custom-select-country w-[30%]"
        >
          {CountryCodeWithFlag.map((country) => (
            <Select.Option key={country.dial_code} value={country.dial_code}>
              {country.emoji} {country.dial_code}
            </Select.Option>
          ))}
        </Select>
        <Input
          className="border-none rounded-r-xl text-lg rounded-l-none w-full !h-14"
          value={value.phoneNumber}
          placeholder={props.placeholder}
          onChange={handlePhoneNumberChange}
          type="tel"
        />
      </div>
    );
  }
);

export default PhoneInput;
