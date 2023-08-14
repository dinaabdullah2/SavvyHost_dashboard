import { useFormikContext } from 'formik';
import Select from 'react-select';
import useFetch from '../../hooks/UseFetch';

type  SelectCategory_TP = {
    placeholder?: string
    onChange?: (option: any) => void
    label?: any
    multi?: boolean
    name?: any
    fieldKey?: "id" | "value" | undefined

};

type options_TP = {
    // [x: string]: any
    data?: any
    id?: number
    value?: any
    label?: string
  }

const SelectCategory =({
    placeholder,
    multi,
    name,
    fieldKey,
    onChange,
    label,
  }: SelectCategory_TP) => {
    const {
        data: StatusOptions,
        isLoading: StatusLoading,
        failureReason,
      } = useFetch<options_TP>({
        endpoint: "api/dashboard/blog/create",
        queryKey: ["Categories-select"],
        onSuccess(data) {},
      })
      const { values,setFieldValue } = useFormikContext()

      const mapStatusOptions = (options: options_TP) => {
        return (
          options?.data?.categories?.map((state: options_TP) => ({
            id: state?.id,
            value: state?.id,
                      //@ts-ignore

            label: state?.name,
          })) || []
        )
      }

      const dataOptions = [
                  //@ts-ignore

        ...mapStatusOptions(StatusOptions),
        {
          id: 0,
          value: 0,
        },
      ]
    return (
        <Select
            id={name}
            required
            placeholder={placeholder}
            name={name}
            isDisabled={!StatusLoading && !!failureReason}
            // loadingPlaceholder="loading"
            // loading={StatusLoading}
            // fieldKey={fieldKey}
            isMulti={multi}
            options={dataOptions}
            onChange={(event) => {
            setFieldValue(name, event?.value);
            }}
        // {...{ ...(value && { value }) }}
      />
    );
};
export default SelectCategory;
