import { useFormikContext } from 'formik';
import React, { useState } from 'react';
type ImageCustom_TP = {
    className?: string;
    type?: string;
    handleChange?: any;
    value?: any;
    name?: any;
};
const UploadImage = ({ className, value, name, type, handleChange, ...props }: ImageCustom_TP) => {
    const { values, setFieldValue } = useFormikContext();
    const [currentImage, setCurrentImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<any>('');
    console.log('🚀 ~ file: UploadImage.tsx:17 ~ UploadImage ~ previewImage:', previewImage);
    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files as FileList;
        console.log('🚀 ~ file: UploadImage.tsx:19 ~ selectImage ~ selectedFiles:', selectedFiles);
        setCurrentImage(selectedFiles?.[0]);
        setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
        console.log(previewImage, 'hey');
        setFieldValue(name, selectedFiles?.[0]);
        console.log(currentImage, 'lll');
    };
    return (
        <>
            <input
                className="mb-3 form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:rounded-s-lg file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary"
                name={name}
                type="file"
                accept="image/*"
                onChange={selectImage}
            />
            {previewImage ? (
                <div>
                    <img className="preview w-[50%] m-auto" src={previewImage} alt="" />
                </div>
            ) : (
                <div>
                    <img className="preview w-[50%] m-auto" src="/assets/images/file-preview.svg" alt="" />
                </div>
            )}
        </>
    );
};

export default UploadImage;
