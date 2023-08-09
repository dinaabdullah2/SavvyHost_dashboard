import { useFormikContext } from 'formik';
import { type } from 'os';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import useFetch from '../../hooks/UseFetch';
import { use } from 'i18next';
type SelectCountries_TP = {
    placeholder?: string
    onChange?: (option: any) => void
    label?: any
    multi?: boolean
    name?: any
    fieldKey?: "id" | "value" | undefined,
    updateData?:any,
    resetForm?:any

};

type options_TP = {
    // [x: string]: any
    data?: any
    id?: number
    value?: any
    label?: string
  }
const SelectCountries = ({
    placeholder,
    multi,
    name,
    fieldKey,
    onChange,
    label,
    updateData,
    resetForm
  }: SelectCountries_TP) => {



    const {
        data: StatusOptions,
        isLoading: StatusLoading,
        failureReason,
      } = useFetch<options_TP>({
        endpoint: "api/dashboard/user/create",
        queryKey: ["Countries-select"],
        onSuccess(data) {},
      })
      const { values,setFieldValue } = useFormikContext()

      const mapStatusOptions = (options: options_TP) => {
        return (
          options?.data?.countries?.map((state: options_TP) => ({
            id: state?.id,
            value: state?.id,
            label: state?.country_name,
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
        loadingPlaceholder="loading"
        loading={StatusLoading}
        fieldKey={fieldKey}
        options={dataOptions}
        onChange={(event) => {
            setFieldValue(name, event?.value);
        }}
        defaultValue={{
            value: !resetForm ? updateData?.country?.id : '',
            label: !resetForm ? updateData?.country?.country_name : 'choose country',

        }}

    // {...{ ...(value && { value }) }}
  />
    );
};
export default SelectCountries;
