import { Space, Select, Input } from "antd";
import React, { forwardRef } from "react";
import "./components.css";

interface PhoneValue {
  code: string;
  amount: string;
}

interface Country {
  code: string;
  currency: {
    code: string;
    symbol: string;
    flag: string;
  };
}

interface Props {
  containerClassName?: string;
  placeholder?: string;
  label?: string;
  allowClear?: boolean;
  className?: string;
  onClear?: () => void;
  countries?: Country[];
  options?: [];
  value?: PhoneValue;
  onChange?: (value: PhoneValue) => void;
}

const CurrencyWithAmount = forwardRef<HTMLInputElement, Props>(
  (
    { className, value = { code: "THB", amount: "" }, onChange, ...props },
    ref
  ) => {
    const handleDialCodeChange = (code: string) => {
      onChange?.({ ...value, code });
    };

    const handlePhoneNumberChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      onChange?.({ ...value, amount: e.target.value });
    };

    return (
      <div className="h-11 gap-0 !w-full flex flex-cols">
        <Select
          value={value.code}
          onChange={handleDialCodeChange}
          className="h-10 custom-select-country w-[30%] border !rounded-l-xl shadow-none"
        >
          {props?.countries?.map((country) => (
            <Select.Option
              key={country.currency.code}
              value={country.currency.code}
            >
              <div className="flex flex-cols gap-2 justify-center content-center self-center">
                <p>{country.currency.code}</p>
                <img
                  className="rounded-md w-5 h-5 self-center"
                  src={country.currency.flag}
                />
              </div>
            </Select.Option>
          ))}
        </Select>
        <Input
          className="border !h-16 rounded-r-xl rounded-l-none"
          value={value.amount}
          placeholder={props.placeholder}
          onChange={handlePhoneNumberChange}
          type="tel"
        />
      </div>
    );
  }
);

export default CurrencyWithAmount;
