import { useFormikContext } from 'formik';
import Select from 'react-select';
type SelectSearch_TP = {
    label?: string;
    placeholder?: string;
    description?: string;
    error?: string;
    className?: string;
    type?: string;
    handleChange?: any;
    value?: any;
    name?: any;
    setSeoSection?: any;
};
const SelectSearch = ({ label, setSeoSection, placeholder, description, error, className, value, name, type,  handleChange, ...props }: SelectSearch_TP) => {
    const { values, setFieldValue } = useFormikContext<any>(); /////////// STATES

    const options = [

        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' },

    ];

    return (
        <Select
            id={name}
            {...props}
            name={name}
            defaultValue={options[0]}
            options={options}
            onChange={(event) => {
                setSeoSection(event?.value)
                setFieldValue(name, event?.value);
            }}
            required
        />
    );
};
export default SelectSearch;
