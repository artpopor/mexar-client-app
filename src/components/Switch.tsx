import React from "react"
import { Switch } from "antd"
import "./components.css"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string
    placeholder?: any
    label?: string
    allowClear?: boolean
    onClear?: () => void
    onChange?: () => void
}
const myswitch = ({ ...props }) => {
    
    return (
            <Switch
            {...props}
        /> 
       
    )
}
const CustomSwitch = React.forwardRef<HTMLInputElement, Props>(myswitch)

export default CustomSwitch