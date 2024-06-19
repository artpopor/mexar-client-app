import Input from "./Input";
import { Select, SelectProps } from "antd";

type InputSelectType = {
  label?: string;
  inputPlaceHolder?: string;
  selectPlaceHolder?: string;
  onChangeInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCombineChange?: (value: any) => void;
  onSelect?: SelectProps<any>["onSelect"];
  inputValue?: string | number;
  selectValue?: string;
  className?: string;
  inputClassName?: string;
  selectClassName?: string;
  children?: React.ReactNode;
  options?: any[];
  defaultSelectValue?:any;
};

const InputSelect = ({
  label,
  inputClassName,
  selectClassName,
  onSelect,
  onChangeInput,
  defaultSelectValue,
  inputValue,
  selectValue,
  className,
  children,
  options,
  ...props
}: InputSelectType) => {
  
  const combinedInputClassName = "text-[#56AEF5] text-xl rounded-l-none " + inputClassName;
  const combinedSelectClassName = "select-currency w-[40%] !text-xl h-14 self-center " + selectClassName;

  return (
    <div className={className}>
      <p className="font-thin text-gray-500 mb-2">{label}</p>
      <div className="flex">
        <Select
          className={combinedSelectClassName}
          placeholder={props.selectPlaceHolder}
          value={selectValue}
          onSelect={onSelect}
          options={options}
          defaultValue={defaultSelectValue}
        >
          {children}
        </Select>

        <Input
          theme="border"
          className={combinedInputClassName}
          placeholder={props.inputPlaceHolder}
          type="number"
          onChange={onChangeInput}
          value={inputValue !== undefined ? inputValue : ''} // Ensure value is defined or use ''
        />
      </div>
    </div>
  );
};

export default InputSelect;
