import { t } from 'i18next';
import useFetch from '../../hooks/UseFetch';
import { Select } from '../molecules';

type SelectCategory_tp = {
    setStatus?: any;
    updateData?: any;
    resetForm?: any;
    onChange?: (option: any) => void;
    name?: string | undefined;
    label?: string;
    fieldKey?: any;
    placeholder?: string;
};
export default function SelectCategory(
    { updateData, resetForm, onChange, name, label }
    : SelectCategory_tp) {
    const {
        data: CategorOptions,
        isLoading: StatusLoading,
        failureReason,
    } = useFetch<any>({
        endpoint: 'api/dashboard/blog/create',
        queryKey: ['catgories-select-option'],
    });

    const dataOptions = CategorOptions?.data?.categories.map((category: any) => ({
        label: category.name,
        value: category.id,
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
            defaultValue={{ label: !resetForm ? updateData?.category?.name : 'Select Category', value: updateData?.category?.id }}
        />
    );
}

