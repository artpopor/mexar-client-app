import  { useRef, useState } from 'react';


// declare type for the props


type InputProps = {
  length?: number;
  onComplete: (pin: string) => void;
};


const OTPInput = ({ length = 6, onComplete }: InputProps) => {
  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(''));
  const handleTextChange = (input: string, index: number) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);
    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }
    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    if (newPin.every((digit) => digit !== '')) {
      onComplete(newPin.join(''));
    }
  };

  return (
    <div className={`grid grid-cols-6 gap-3`}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={OTP[index]}
          onChange={(e) => handleTextChange(e.target.value, index)}
          ref={(ref) => (inputRef.current[index] = ref as HTMLInputElement)}
          className={`focus:border  focus:border-cyan-400 rounded-xl text-center p-2 py-5 outline-none`}
        />
      ))}
    </div>
  );
};


export default OTPInput;