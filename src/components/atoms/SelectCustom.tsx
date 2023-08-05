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
    setSeoSection?: any;
};
const SelectCustom = ({ label, setSeoSection, placeholder, description, error, className, value, name, type, options, handleChange, ...props }: SelectCustom_TP) => {
    const { values, setFieldValue } = useFormikContext<any>(); /////////// STATES

    return (
        <Select
            id={name}
            {...props}
            name={name}
            //  value={value || values[name]}
            defaultValue={options[0]}
            options={options}
            onChange={(event) => {
                // setSeoSection(event?.value)
                setFieldValue(name, event?.value);
            }}
            required
        />
    );
};
export default SelectCustom;