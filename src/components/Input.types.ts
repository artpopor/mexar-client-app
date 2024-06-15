export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string;
    placeholder?: string;
    label?: string;
    allowClear?: boolean;
    className?: string;
    theme?: string;
    onClear?: () => void;
  }