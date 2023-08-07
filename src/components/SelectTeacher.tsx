import { Form, Formik, useFormikContext } from "formik"

import { t } from "i18next"
import { Select } from "../molecules"


type SelectTeacher_tp = {
  placeholder?: string
  onChange?: (option: any) => void
  label?: string
  multi?: boolean
  TeacherName?: string | undefined
  fieldKey?: "id" | "value" | undefined
}

type options_TP = {
  [x: string]: any
  data: any
  id: number
  value: string
  label: string
}
export default function SelectTeacher({
  placeholder,
  multi,
  TeacherName,
  fieldKey,
  onChange,
  label,
}: SelectTeacher_tp) {
  const {
    data: StatusOptions,
    isLoading: StatusLoading,
    failureReason,
  } = useFetch<options_TP>({
    endpoint: "dashboard/teachers",
    queryKey: ["teachers-select"],
    onSuccess(data) {},
  })
  const { setFieldValue, values } = useFormikContext()

  const mapStatusOptions = (options: options_TP) => {
    return (
      options?.data?.teachers?.map((state: options_TP) => ({
        id: state?.id,
        value: state?.name,
        label: state?.name,
      })) || []
    )
  }

  const dataOptions = [
    ...mapStatusOptions(StatusOptions),
    {
      id: 0,
      value: 0,
      label: "الكل",
    },
  ]

  return (
    <div>
      <Select
        id="optionStatus"
        label={label}
        placeholder={placeholder}
        name={TeacherName}
        isDisabled={!StatusLoading && !!failureReason}
        loadingPlaceholder={`${t("loading")}`}
        loading={StatusLoading}
        fieldKey={fieldKey}
        isMulti={multi}
        options={dataOptions}
        onChange={onChange}
        // {...{ ...(value && { value }) }}
      />
    </div>
  )
}
