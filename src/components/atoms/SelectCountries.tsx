import { useFormikContext } from 'formik';
import { type } from 'os';
import React, { FC } from 'react';
import Select from 'react-select';
type SelectCustom_TP = {
    label?: string;
    placeholder?: string;
    description?: string;
    error?: string;
    className?: string;
    type?: string;
    handleChange?: any;
    value?: any;
    name?: any;
    options?:any;
}
const SelectCountries = ({ label ,placeholder, description, error, className, value, name, type,options, handleChange, ...props }: SelectCustom_TP) => {
    const { values, setFieldValue } = useFormikContext<any>(); /////////// STATES
    // console.log("🚀 ~ file: InputCustom.tsx:18 ~ InputCustom ~ values:", values)

    return (
        <Select
             id={name}
             {...props}
             name={name}
             defaultValue={options[0]}
             options={options}
             onChange={(event)=>{
                setFieldValue(name,event?.id)}
            }
             required />
    );
};
export default SelectCountries;
