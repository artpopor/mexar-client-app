import React from "react"
import { Switch } from "antd"
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string
    placeholder?: any
    label?: string
    allowClear?: boolean
    onClear?: () => void
    onChange?: () => void
}
import { useState } from "react"
const myswitch = ({ ...props }) => {
    const [checked, setChecked] = useState(true);
    const switchStyle = checked ? {
        backgroundColor: '#FFEB80',  // Color when checked
      } : {backgroundColor : '#597DE1'};
    
    return (
        <Switch
        {...props}
            checked={checked}
            // onChange={() => setChecked(!checked)}
            style={switchStyle}
        />
    )
}
const CustomSwitch = React.forwardRef<HTMLInputElement, Props>(myswitch)

export default CustomSwitch