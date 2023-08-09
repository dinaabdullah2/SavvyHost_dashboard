import { useFormikContext } from 'formik';
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
const SelectCountries = ({ label, placeholder, description, error, className, value, name, type, options, handleChange, ...props }: SelectCustom_TP) => {
    const { values, setFieldValue } = useFormikContext<any>(); /////////// STATES

    const optionVal = options?.map((item:any)=>({
        value:item?.id,
        label:item?.country_name,
    }))

    return (
        <Select
            id={name}
            {...props}
            name={name}
            // defaultValue={optionVal? optionVal[0]}
            options={optionVal}
            onChange={(event) => {
                //@ts-ignore
                setFieldValue(name,event?.value);
            }}
            required
        />
    );
};
export default SelectCountries;
