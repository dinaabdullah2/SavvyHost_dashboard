import { useFormikContext } from 'formik';
import { Select } from '../molecules';
type SelectSearch_TP = {
    setStatus?: any;
    updateData?: any;
    resetForm?: any;
    onChange?: (option: any) => void;
    name?: string | undefined;
    label?: string;
    fieldKey?: any;
    placeholder?: string;
    setSeoSection?: any;
};
const SelectSearch = ({ updateData, resetForm, onChange, name, label }: SelectSearch_TP) => {
    const { values, setFieldValue } = useFormikContext<any>(); /////////// STATES

    const options = [

        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' },

    ];

    return (
        <Select
            placeholder={'updateData?.country?.name'}
            label={label}
            
            id="optionStatus"
            name={name}
            loadingPlaceholder={'loading'}
            options={options}
            onChange={onChange}
            fieldKey="id"
            defaultValue={{
                label: !resetForm ?
                   updateData?.searchable == 1 ?"Yes":'No'
                   : 'Yes',
                value: !resetForm ? (updateData?.searchable == 1 ? 1 : 0) : ''
            }}
        />
    );
};
export default SelectSearch;
