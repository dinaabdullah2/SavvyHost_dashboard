import { useFormikContext } from "formik";
import { t } from "i18next";
import { Select } from "../molecules";
type SelectType_tp = {
  placeholder?: string;
  onChange?: (option: any) => void;
  label?: string;
  multi?: boolean;
  TypeName?: string | undefined;
  fieldKey?: "id" | "value" | undefined;
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
export default function SelectType({
  placeholder,
  multi,
  TypeName,
  fieldKey,
  onChange,
  updateData,
  resetForm,
  label,
}: SelectType_tp) {
  const { setFieldValue, values } = useFormikContext();

  const dataOptions = [
    {
      id: 0,
      value: 0,
      label: "الكل",
    },
    {
      id: 1,
      value: "student",
      label: "طالب",
    },
    {
      id: 2,
      value: "teacher",
      label: "معلم",
    },
  ];

  return (
    <div>
      <Select
        id="optionStatus"
        label={label}
        placeholder={placeholder}
        name={TypeName}
        loadingPlaceholder={`${t("loading")}`}
        fieldKey={fieldKey}
        isMulti={multi}
        options={dataOptions}
        onChange={onChange}
        defaultValue={{
          value: !resetForm ? updateData?.type : "",
          label: !resetForm ? updateData?.type : "اختر النوع",
        }}
      />
    </div>
  );
}
