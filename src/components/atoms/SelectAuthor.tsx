import { t } from 'i18next';
import useFetch from '../../hooks/UseFetch';
import { Select } from '../molecules';

type SelectAuthor_tp = {
    setStatus?: any;
    updateData?: any;
    resetForm?: any;
    onChange?: (option: any) => void;
    name?: string | undefined;
    label?: string;
    fieldKey?: any;
    placeholder?: string;
};
export default function SelectAuthor(
    { updateData, resetForm, onChange, name, label }
    : SelectAuthor_tp) {
    const {
        data: AuthorsOptions,
        isLoading: StatusLoading,
        failureReason,
    } = useFetch<any>({
        endpoint: 'api/dashboard/blog/create',
        queryKey: ['Authors-select-option'],
    });

    const dataOptions = AuthorsOptions?.data?.admins.map((admin: any) => ({
        label: admin.name,
        value: admin.id,
    }));


    return (
        <Select
            placeholder={"Author"}
            id="optionStatus"
            name={name}
            isDisabled={!StatusLoading && !!failureReason}
            loadingPlaceholder={`${t('loading')}`}
            loading={StatusLoading}
            options={dataOptions}
            onChange={onChange}
            fieldKey="id"
            defaultValue={{ label: !resetForm ? updateData?.country?.name : 'Select Author', value: updateData?.country?.id }}
        />
    );
}
