import React from "react"
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string
    placeholder?: any
    label?: string
    allowClear?: boolean
    className? : string
    onClear?: () => void
  }
const Input = ({ className, ...props }: Props) => {
    const baseClassName = 'bg-white text-gray-600 p-3 px-4  rounded-xl w-full outline-none'
    return(
        <input    {...props} className={`${baseClassName} ${className}`}/>
    )
}


export default Input