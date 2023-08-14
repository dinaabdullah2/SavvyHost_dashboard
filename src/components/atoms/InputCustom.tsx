import { useFormikContext } from 'formik';

type InputCustom_TP = {
    label?: string;
    placeholder?: string;
    description?: string;
    error?: string;
    className?: string;
    type?: string;
    handleChange?: any;
    value?: any;
    name?: any;
};
const InputCustom = ({ label, placeholder, description, error, className, value, name, type, handleChange, ...props }: InputCustom_TP) => {
    // console.log("🚀 ~ file: InputCustom.tsx:17 ~ InputCustom ~ props:", props)
    const { values, setFieldValue } = useFormikContext<any>(); /////////// STATES
    // console.log('🚀 ~ file: InputCustom.tsx:19 ~ InputCustom ~ values:', values);

    return (
        <input
            id={name}
            {...props}
            name={name}
            value={ values[name]}
            type={type}
            placeholder={placeholder}
            onChange={(e) => {
                // setFieldValueState(e.target.value)
                          //@ts-ignore

                if (props?.value === undefined) {
                    setFieldValue(name, e.target.value);
                }
            }}
            className="form-input"
            required
        />
    );
};

export default InputCustom;
