import React from "react";
import { Switch, SwitchProps } from "antd";
import "./components.css";

interface Props extends SwitchProps {
    containerClassName?: string;
    placeholder?: any;
    label?: string;
    allowClear?: boolean;
    onClear?: () => void;
}

const myswitch = (
    props: Props, 
    ref: React.Ref<HTMLInputElement>
) => {
    return (
        <Switch
            {...props}
            ref={ref as React.Ref<any>} // Cast the ref to any to avoid type mismatch
        />
    );
};

const CustomSwitch = React.forwardRef<HTMLInputElement, Props>(myswitch);

export default CustomSwitch;
