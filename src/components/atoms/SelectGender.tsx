import { t } from 'i18next';
import useFetch from '../../hooks/UseFetch';
import { Select } from '../molecules';

type SelectCountries_tp = {
    setStatus?: any;
    updateData?: any;
    resetForm?: any;
    onChange?: (option: any) => void;
    name?: string | undefined;
    label?: string;
    fieldKey?: any;
    placeholder?: string;
};
export default function SelectGender({ updateData, resetForm, onChange, name, label }: SelectCountries_tp) {
    const dataOptions = [
        {
            id: 1,
            value: 1,
            label: 'Male',
        },
        {
            id: 2,
            value: 0,
            label: 'Female',
        },
    ];

    return (
        <div>
            <Select
                placeholder={'updateData?.country?.name'}
                id="option"
                name={name}
                loadingPlaceholder={`${t('loading')}`}
                options={dataOptions}
                onChange={onChange}
                fieldKey="id"
                defaultValue={{
                    label: !resetForm ? updateData?.gender : 'Select Gender',
                    value: !resetForm ? (updateData?.gender === 'Male' ? 1 : 0) : '' }}
             />
        </div>
    );
}
