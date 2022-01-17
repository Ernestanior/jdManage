import React, { FC, useCallback } from "react"
import { IFormComponent } from "../interface";
import { Select } from "antd"
import { splitPlus } from "../utils";

interface IProps{
    tokenSeparator?: string;
    style?: React.CSSProperties
}

/**
 * 兼容字符串数组和字符串型数组（也就是写成子字符串的数组）
 * @param props 
 */
const InputTag: FC<IFormComponent & IProps> = props => {
    const isStringMode = !Array.isArray(props.value);
    const realTokenSeparators = props.tokenSeparator || " "
    const onChange = useCallback((value: string[]) => {
        const strValue = isStringMode ? value.join(realTokenSeparators) : value;
        props.onChange && props.onChange(strValue);
    }, [props, realTokenSeparators, isStringMode]);
    const value = isStringMode ? splitPlus(props.value, realTokenSeparators) : props.value;
    return <Select
        value={value}
        onChange={onChange}
        mode="tags"
        open={false}
        size={props.size}
        maxTagCount={10}
        tokenSeparators={[realTokenSeparators]}
        style={props.style}
    />
}

export default InputTag;
