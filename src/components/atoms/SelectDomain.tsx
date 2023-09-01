import { t } from 'i18next';
import useFetch from '../../hooks/UseFetch';
import { Select } from '../molecules';

type SelectDomain_tp = {
    setStatus?: any;
    updateData?: any;
    resetForm?: any;
    onChange?: (option: any) => void;
    name?: string | undefined;
    label?: string;
    fieldKey?: any;
    placeholder?: string;
};
export default function SelectDomain(
    { updateData, resetForm, onChange, name, label }
    : SelectDomain_tp) {
    const {
        data: DomainsOptions,
        isLoading: StatusLoading,
        failureReason,
    } = useFetch<any>({
        endpoint: 'api/dashboard/event/create',
        queryKey: ['domains-select-option'],
    });

    const dataOptions = DomainsOptions?.data?.domains.map((domain: any) => ({
        label: domain?.name,
        value: domain?.id,
    }));


    return (
        <Select
            placeholder={"select domains"}
            id="Domains"
            name={name}
            isDisabled={!StatusLoading && !!failureReason}
            loadingPlaceholder={`${t('loading')}`}
            loading={StatusLoading}
            options={dataOptions}
            onChange={onChange}
            isMulti
            fieldKey="id"
            //@ts-ignore
            defaultValue={!resetForm ? updateData?.domains?.map(domian => ({label: domian?.name, value: domian?.id})): []}
            // defaultValue={{ label: !resetForm ? updateData?.category?.name : 'Select Domain', value: updateData?.category?.id }}
        />
    );
}

