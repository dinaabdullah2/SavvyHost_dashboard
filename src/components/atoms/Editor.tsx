import { useFormikContext } from 'formik';
import { type } from 'os';
import React, { FC } from 'react';
import ReactQuill from 'react-quill';

type Editor_TP = {
    label?: string;
    placeholder?: string;
    description?: string;
    error?: string;
    className?: string;
    type?: string;
    handleChange?: any;
    value?: any;
    name?: any;
};
const Editor = ({ label, placeholder, description, error, className, value, name, type, handleChange, ...props }: Editor_TP) => {
    const { values, setFieldValue } = useFormikContext<any>(); /////////// STATES
    console.log("🚀 ~ file: InputCustom.tsx:18 ~ InputCustom ~ values:", values,name)

    return (

        <ReactQuill
           id={name}
           placeholder={placeholder}
           value={value || values[name]}
           onChange={(value) => {
            // setFieldValueState(e.target.value)
            setFieldValue(name, value)
        }}
         theme="snow"
        />
    );
};

export default Editor;