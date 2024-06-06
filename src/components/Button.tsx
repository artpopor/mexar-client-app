import React from "react"
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string
    placeholder?: any
    label?: string
    allowClear?: boolean
    onClear?: () => void
  }
const button = ({ ...props }) => {

    return(
        <button {...props} className="bg-[#FFEB80] text-[#556CBB] p-3 px-4  rounded-xl w-full outline-none focus:outline-4"/>
    )
}
const Button = React.forwardRef<HTMLInputElement, Props>(button)

export default Button