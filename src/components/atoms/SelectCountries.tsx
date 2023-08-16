import { t } from 'i18next';
import useFetch from '../../hooks/UseFetch';
import { Select } from '../molecules';

type SelectCountries_tp = {
    setStatus?: any;
    updateData?: any;
    resetForm?: any;
    onChange?: (option: any) => void;
    CountryName?: string | undefined;
    label?: string;
    fieldKey?: any;
    placeholder?: string;
};
export default function SelectCountries(
    { updateData, resetForm, onChange, CountryName, label }
    : SelectCountries_tp) {
    const {
        data: CountryOptions,
        isLoading: StatusLoading,
        failureReason,
    } = useFetch<any>({
        endpoint: 'api/dashboard/user/create',
        queryKey: ['Countries-select-option'],
    });

    const dataOptions = CountryOptions?.data?.countries.map((country: any) => ({
        label: country.name,
        value: country.id,
    }));


    return (
        <Select
            placeholder={"country"}
            id="optionStatus"
            name={CountryName}
            isDisabled={!StatusLoading && !!failureReason}
            loadingPlaceholder={`${t('loading')}`}
            loading={StatusLoading}
            options={dataOptions}
            onChange={onChange}
            fieldKey="id"
            defaultValue={{ label: !resetForm ? updateData?.country?.name : 'Select Country', value: updateData?.country?.id }}
        />
    );
}
