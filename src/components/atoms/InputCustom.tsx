import { useFormikContext } from 'formik';
import { type } from 'os';
import React, { FC } from 'react';

type InputCustom_TP = {
    label?: string;
    placeholder?: string;
    description?: string;
    error?: string;
    className?: string;
    type?: string;
    handleChange?: any;
    value?: any;
    name?: string;
};
const InputCustom = ({ label, placeholder, description, error, className, value, name, type, handleChange, ...props }: InputCustom_TP) => {
    const { values, setFieldValue } = useFormikContext(); /////////// STATES
    console.log("🚀 ~ file: InputCustom.tsx:18 ~ InputCustom ~ values:", values)

    return (
        <input
            id={name}
            {...props}
            name={name}
            value={value || values[name]}
            type={type}
            placeholder={placeholder}
            onChange={(e) => {
                // setFieldValueState(e.target.value)
                setFieldValue(name, e.target.value)
            }}
            className="form-input"
            required
        />
    );
};

export default InputCustom;
