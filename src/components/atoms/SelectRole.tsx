import { useFormikContext } from 'formik';
import { type } from 'os';
import React from 'react';
import Select from 'react-select';
import useFetch from '../../hooks/UseFetch';

type SelectRoles_TP = {
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
const SelectRole =  ({
    placeholder,
    multi,
    name,
    fieldKey,
    onChange,
    label,
  }: SelectRoles_TP)  => {
    const {
        data: StatusOptions,
        isLoading: StatusLoading,
        failureReason,
      } = useFetch<options_TP>({
        endpoint: "api/dashboard/user/create",
        queryKey: ["Roles-select"],
        onSuccess(data) {},
      })
      const { values,setFieldValue } = useFormikContext()

      const mapStatusOptions = (options: options_TP) => {
        return (
          options?.data?.roles?.map((state: options_TP) => ({
            id: state?.id,
            value: state?.id,
            label: state?.role_name,
          })) || []
        )
      }

      const dataOptions = [
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
export default SelectRole;
