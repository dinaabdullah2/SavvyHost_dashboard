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
  name?:any;
  updateData?:any,
  resetForm?:any
};

type options_TP = {
  [x: string]: any;
  data: any;
  id: number;
  value: string;
  updateData?: any;
  resetForm?: any;
  label?: any;


};
export default function SelectGender({
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
        value: 1,
        label: "Male",
    },
    {
      id: 2,
      value: 0,
      label: "Female",
    }

  ];

  return (
    <div>
        <Select
        id="optionStatus"
        label={label}
        placeholder={placeholder}
        name={name}
        // isDisabled={!StatusLoading && !!failureReason}
        // loadingPlaceholder={`${t("loading")}`}
        // loading={StatusLoading}
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
        // {...{ ...(value && { value }) }}
      />

    </div>
  );
}
