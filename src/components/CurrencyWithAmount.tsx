import { Select, Input } from "antd";
import React, { forwardRef, useEffect } from "react";
import "./components.css";

interface PhoneValue {
  code?: string  ;
  amount: any;
}

interface Country {
  code?: string;
  symbol: string;
  flag: string;
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
  value?: PhoneValue ;
  readonly? : boolean;
  onChange?: (value: PhoneValue) => void;
}

const CurrencyWithAmount = forwardRef<HTMLInputElement, Props>(
  (
    { className, value = { code: "", amount: "" }, onChange, ...props }
  ) => {
    const handleDialCodeChange = (code: string) => {
      onChange?.({ ...value, code });
    };

    const handlePhoneNumberChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      onChange?.({ ...value, amount: e.target.value });
    };
    useEffect(()=>{
      console.log("props",props,value);
    },[])

    return (
      <div className="h-11 gap-0 !w-full flex flex-cols">
        <Select
          value={value?.code}
          onChange={handleDialCodeChange}
          className="h-12 custom-select-country w-[20%] min-w-24 border !border-r-0 !rounded-l-xl shadow-none"
        >
          {props?.countries?.map((country) => (
            <Select.Option key={country?.code} value={country?.code}>
              <div className="flex flex-cols gap-2 justify-center content-center self-center">
                <p>{country.code}</p>
                <img
                  className="rounded-md w-5 h-5 self-center"
                  src={country.flag}
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
          readOnly={props.readonly}
        />
      </div>
    );
  }
);

export default CurrencyWithAmount;
