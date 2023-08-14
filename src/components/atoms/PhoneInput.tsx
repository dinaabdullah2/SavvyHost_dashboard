import { useFormikContext } from 'formik';
import { t } from 'i18next';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneInput2 = ({ name, label, setPhone_country, updateData, setPhoneCode, resetForm }: any) => {
    const [phone, setPhone] = useState(!resetForm ? updateData?.phone_all : '');
    const [countryCode, setCountryCode] = useState(); // Add countryCode state

    const { setFieldValue, errors, touched, handleBlur, values } = useFormikContext<any>();

    const handlePhoneChange = ({ value, selectedCountry, number }: any) => {
        // setPhoneCode(selectedCountry?.dialCode);
        // setPhone(value);
        // setCountryCode(selectedCountry?.countryCode);
        // setPhone_country(selectedCountry?.countryCode?.toUpperCase()); // Update the countryCode state
        setFieldValue(name, number);
    };

    return (
        <PhoneInput
            country={'eg'}
            value={values[name]}
            onChange={(value: any) => setFieldValue(name, value)}
            enableSearch
            onBlur={handleBlur}
            //@ts-ignore

            className={{
                error: touched[name] && !!errors.phone,
            }}
            defaultValue={{
                value: !resetForm ? updateData?.phone : '',
                label: !resetForm ? updateData?.phone : 'choose Type',
            }}
        />
    );
};

export default PhoneInput2;
