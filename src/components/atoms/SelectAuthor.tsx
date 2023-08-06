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
    options?: any;
};
const SelectAuthor = ({ label, placeholder, description, error, className, value, name, type, options, handleChange, ...props }: SelectCustom_TP) => {
    const { values, setFieldValue } = useFormikContext<any>(); /////////// STATES

    const optionVal = options?.map((item:any)=>({
        value:item?.id,
        label:item?.name,
    }))

    return (
        <Select
            id={name}
            {...props}
            name={name}
            options={optionVal}
            onChange={(event) => {
                setFieldValue(name, event?.value);
            }}
            required
        />
    );
};
export default SelectAuthor;
