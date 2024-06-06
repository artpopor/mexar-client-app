import React from "react"
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string
    placeholder?: any
    label?: string
    allowClear?: boolean
    onClear?: () => void
  }
const CustomInput = ({ ...props }) => {
    console.log(props.type);
    return(
        <input {...props} className="bg-white text-gray-600 p-3 px-4  rounded-xl w-full outline-none"/>
    )
}
const Input = React.forwardRef<HTMLInputElement, Props>(CustomInput)

export default Input