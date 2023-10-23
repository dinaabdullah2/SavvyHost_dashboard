import React, { useEffect, useState } from 'react'
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { useFormikContext } from 'formik';
import moment from 'moment/moment';


type DateInputCustom_TP = {
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
const DateInput = ({ label, placeholder, description, error, className, value, name, type, handleChange, ...props }: DateInputCustom_TP) => {
    const { values, setFieldValue } = useFormikContext<any>(); /////////// STATES
    useEffect(()=>{
        if(values['start_date']&& !values['end_date'] ){
           document.getElementById('end_date')?.click()
        }
    })


    return (
    <Flatpickr
     id={name}
     name={name}
     value={value || values[name]}
     options={{ dateFormat: 'Y-m-d' }}
     className="form-input "
     onChange={(date) => {
        // setFieldValueState(e.target.value)
        setFieldValue(name,moment(date[0]).format('YYYY-MM-DD'))
    }} />

  )
}

export default DateInput
