import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useFormikContext } from 'formik';
import { t } from 'i18next';
import { Label } from './Label';

const PhoneInput2 = ({ name, label, setPhone_country, updateData, setPhoneCode, resetForm }: any) => {
    const [phone, setPhone] = useState(!resetForm ? updateData?.phone_all : '');
    const [countryCode, setCountryCode] = useState(); // Add countryCode state

    const { setFieldValue, errors, touched, handleBlur } = useFormikContext<any>();

    const handlePhoneChange = ({ value, selectedCountry,  number }: any) => {
        // setPhoneCode(selectedCountry?.dialCode);
        // setPhone(value);
        // setCountryCode(selectedCountry?.countryCode);
        // setPhone_country(selectedCountry?.countryCode?.toUpperCase()); // Update the countryCode state
        setFieldValue(name, number);
    };

    return (
        <div className="col-span-1">
            <div className="flex flex-col gap-1 ">
                <Label htmlFor={name} className="mb-3">
                    {label}
                </Label>

                <PhoneInput
                    country={!resetForm ? updateData?.phone_country : 'eg'}
                    value={phone}
                    onChange={handlePhoneChange}
                    enableSearch
                    onBlur={handleBlur}
                    className={{
                        error: touched[name] && !!errors.phone,
                    }}
                    defaultValue={{
                        value: !resetForm ? updateData?.phone : '',
                        label: !resetForm ? updateData?.phone : t('choose Type'),
                    }}
                />
            </div>
        </div>
    );
};

export default PhoneInput2;