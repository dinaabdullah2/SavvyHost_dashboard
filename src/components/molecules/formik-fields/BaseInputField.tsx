import { useFormikContext } from "formik"
import { BaseInput, FormikError, Label } from "../../atoms"
import UploadImage from "../../atoms/UploadImage"
import { TextAreaField } from "./TextAreaField"

export const BaseInputField = ({
  label,
  id,
  required,
  labelProps,
  placeholder,
  type = "text",
  ...props
}: {
  label?: string
  id: string
  required?: boolean
  labelProps?: {
    [key: string]: any
  }
  name: string
  type: "text" | "number" | "password" | "email" | "file" | "textarea"
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const { setFieldValue, setFieldTouched, errors, touched, values } =
  useFormikContext<{
    [key: string]: any
  }>()

  // const [fieldValue, setFieldValueState] = useState(
  //   props.value || values[props.name]
  // )

  // useEffect(() => {
  //   setFieldValue(props.name, fieldValue)
  // }, [fieldValue])

  return (
    <div className="col-span-1">
      <div className="flex flex-col gap-1">
        {label && (
          <Label
            htmlFor={id}
            {...labelProps}
            required={required}
            className="mb-3"
          >
            {label}
          </Label>
        )}
        {type == "file" ? (
          <UploadImage name={props?.name} />
        ) : type == "textarea" ? (
          <TextAreaField
          //@ts-ignore
            label={props?.label}
            name={props?.name}
          //@ts-ignore
            placeholder={props?.placeholder}
            id={id}
            // value={props.value || values[props.name]}
          />
        ) : (
          <BaseInput
            type={type}
            id={id}
            {...props}
            // value={fieldValue}
            value={props.value || values[props.name]}
            error={touched[props.name] && !!errors[props.name]}
            autoComplete="off"
            onBlur={() => {
              setFieldTouched(props.name, true)
            }}
            onChange={(e) => {
              if (props.value === undefined) {
                // setFieldValueState(e.target.value)
                setFieldValue(props.name, e.target.value)
              }
            }}
          />
        )}
      </div>
      <FormikError name={props.name} />
    </div>
  )
}
