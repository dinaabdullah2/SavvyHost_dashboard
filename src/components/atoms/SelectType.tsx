import { t } from 'i18next';
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
export default function SelectType({ updateData, resetForm, onChange, name, label }: SelectCountries_tp) {
    const dataOptions = [
      {
          id: 1,
          value: 'traveller',
          label: "Traveller",
      },
      {
        id: 2,
        value: 'company',
        label: 'Company',
      }

    ];

    return (
        <div>
            <Select
                placeholder={'Type'}
                id="optionStatus"
                name={name}
                loadingPlaceholder={`${t('loading')}`}
                options={dataOptions}
                onChange={onChange}
                fieldKey="id"
                defaultValue={{ label: !resetForm ? updateData?.type : 'Select Type', value: updateData?.type}}
            />
        </div>
    );
}
