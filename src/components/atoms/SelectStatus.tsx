import Select from 'react-select';
import { useFormikContext } from "formik";
import { t } from "i18next";

type SelectType_tp = {
  placeholder?: string;
  onChange?: (option: any) => void;
  label?: string;
  multi?: boolean;
//   TypeName?: string | undefined;
  fieldKey?: "id" | "value" | undefined;
  name?:any
};

type options_TP = {
  [x: string]: any;
  data: any;
  id: number;
  value: string;
  updateData?: any;
  resetForm?: any;
  label: string;
};
export default function SelectStatus({
  placeholder,
  multi,
  name,
  fieldKey,
  onChange,
  updateData,
  resetForm,
  label,
}: SelectType_tp) {
  const { setFieldValue, values } = useFormikContext();

  const dataOptions = [
    {
        id: 1,
        value: 'active',
        label: "active",
    },
    {
      id: 2,
      value: 'suspend',
      label: "suspend",
    }

  ];

  return (
    <div>
      <Select
        id="optionStatus"
        label={label}
        placeholder={placeholder}
        name={name}
        loadingPlaceholder={`${t("loading")}`}
        fieldKey={fieldKey}
        isMulti={multi}
        options={dataOptions}
        onChange={(event) => {
            setFieldValue(name, event?.value);
        }}

        defaultValue={{
          value: !resetForm ? updateData?.gender : "",
          label: !resetForm ? updateData?.gender : "Select gender",
        }}
      />
    </div>
  );
}
