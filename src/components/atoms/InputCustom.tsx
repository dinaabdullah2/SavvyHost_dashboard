import { type } from 'os';
import React, { FC } from 'react'



type InputCustom_TP = {
    label?: string;
    placeholder?: string;
    description?: string;
    error?: string;
    className?:string
    type?:string;
    handleChange?:any;
    value?:any
    name?:string
  };
const InputCustom = ({
    label,
    placeholder,
    description,
    error,
    className,
    value,
    name,
    type,
    handleChange
  }:InputCustom_TP) => {
  return (
        <input id={name} name={name} value={value}  type={type} placeholder={placeholder}  onChange={handleChange} className="form-input" required />

  )
}

export default InputCustom
