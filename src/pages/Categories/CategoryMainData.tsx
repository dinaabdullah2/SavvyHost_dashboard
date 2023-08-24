import { useFormikContext } from 'formik';
import { useState } from 'react';
import { Button } from '../../components/atoms';
import InputCustom from '../../components/atoms/InputCustom';
import UploadImage from '../../components/atoms/UploadImage';

export default function CategoryMainData({ pageData, resetForm , loadingUpdate , postLoading }: any) {
    const { setFieldValue } = useFormikContext();
    const [seoSection, setSeoSection] = useState<any>(1);
    const publish = [
        { value: 'publish', label: 'publish' },
        { value:  'draft', label: 'draft' },
    ];
    return (
        <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5">
            <div className="lg:col-span-12 max-sm:col-span-1 ">
                <label htmlFor="name">Name</label>
                <InputCustom type="text" name="name" />
            </div>
            <div className="lg:col-span-12 max-sm:col-span-1 ">
                <label htmlFor="content">Slug</label>
                <InputCustom  name="slug" />
            </div>
            <div className="lg:col-span-12 max-sm:col-span-1 ">
                <UploadImage name="image" updateData={pageData} resetForm={resetForm} />
            </div>



            <div className="lg:col-span-12 max-sm:col-span-1 ">
                <Button variant='primary' type='submit' loading={loadingUpdate || postLoading}>
                    submit
                </Button>
            </div>
        </div>
    );
}
