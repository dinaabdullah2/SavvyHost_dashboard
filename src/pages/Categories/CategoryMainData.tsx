import React, { Fragment, useState } from 'react';
import { Tab } from '@headlessui/react';
import InputCustom from '../../components/atoms/InputCustom';
import PhoneInput2 from '../../components/atoms/PhoneInput';
import SelectGender from '../../components/atoms/SelectGender';
import SelectRole from '../../components/atoms/SelectRole';
import SelectType from '../../components/atoms/SelectType';
import SelectStatus from '../../components/atoms/SelectStatus';
import Editor from '../../components/atoms/Editor';
import UploadImage from '../../components/atoms/UploadImage';
import SelectCountries from '../../components/atoms/SelectCountries';
import { useFormikContext } from 'formik';
import { Button } from '../../components/atoms';
import SelectSearch from '../../components/atoms/SelectSearchable';
import { TextAreaField } from '../../components/atoms/TextAreaField';
import RadioCustom from '../../components/atoms/RadioCustom';

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
                <UploadImage name="image" />
            </div>



            <div className="lg:col-span-12 max-sm:col-span-1 ">
                <Button variant='primary' type='submit' loading={loadingUpdate || postLoading}>
                    submit
                </Button>
            </div>
        </div>
    );
}
