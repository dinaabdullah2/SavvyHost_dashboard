import { t } from 'i18next';
import useFetch from '../../hooks/UseFetch';
import { Select } from '../molecules';

type SelectRole_tp = {
    setStatus?: any;
    updateData?: any;
    resetForm?: any;
    onChange?: (option: any) => void;
    name?: string | undefined;
    label?: string;
    fieldKey?: any;
    placeholder?: string;
};
export default function SelectRole({ updateData, resetForm, onChange, name, label }: SelectRole_tp) {
    const {
        data: CountryOptions,
        isLoading: StatusLoading,
        failureReason,
    } = useFetch<any>({
        endpoint: 'api/dashboard/user/create',
        queryKey: ['Role-option'],
    });

    const dataOptions = CountryOptions?.data?.roles.map((role: any) => ({
        label: role.role_name,
        value: role.id,
    }));

    return (
        <Select
            placeholder={'Role'}
            id="optionStatus"
            name={name}
            isDisabled={!StatusLoading && !!failureReason}
            loadingPlaceholder={`${t('loading')}`}
            loading={StatusLoading}
            options={dataOptions}
            onChange={onChange}
            fieldKey="id"
            defaultValue={{
                label: !resetForm ? (updateData?.role_id == 1 ? 'Admin' : 'User') : 'Select Role',
                value: !resetForm ? updateData?.role_id : '',
            }}
        />
    );
}
