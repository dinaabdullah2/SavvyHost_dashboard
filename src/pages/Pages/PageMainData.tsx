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

export default function PageMainData({ pageData, resetForm , loadingUpdate , postLoading }: any) {
    const { setFieldValue } = useFormikContext();
    const [seoSection, setSeoSection] = useState<any>(pageData?.searchable);
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
                <label htmlFor="content">Content</label>
                <Editor  name="content" />
            </div>

        <div className="lg:col-span-12 max-sm:col-span-1 ">
            <div className="border pb-2 border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 ">
                <h5 className="mb-5 w-[100%] text-base font-semibold dark:text-white p-2  border-b border-dashed border-white-light">Seo Manager</h5>
                <p className="text-white-dark pb-2 px-2 text-sm">Allow search engines to show this service in search results?</p>
                    <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
                        <div className="lg:col-span-12 max-sm:col-span-1 pt-1 pb-2">
                            <SelectSearch
                                setSeoSection={setSeoSection}
                                updateData={pageData}
                                name="searchable"
                                resetForm={resetForm}
                                onChange={(option) => {
                                    setFieldValue('searchable', option?.value )
                                    setSeoSection(option?.value)
                                }}
                            />
                        </div>
                        {seoSection == 1 ? (
                            <div className="lg:col-span-12 max-sm:col-span-1 ">
                                <Tab.Group>
                                    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                        <Tab as={Fragment}>
                                            {({ selected }) => (
                                                <button className={`${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''}
                                                            dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
                                                            >
                                                                General
                                                            </button>
                                                        )}
                                                    </Tab>
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                className={`${
                                                                    selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''
                                                                } dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
                                                            >
                                                                Facebook
                                                            </button>
                                                        )}
                                                    </Tab>
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                className={`${
                                                                    selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''
                                                                } dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
                                                            >
                                                                Twitter
                                                            </button>
                                                        )}
                                                    </Tab>
                                                </Tab.List>

                                                <Tab.Panels>
                                                    <Tab.Panel>
                                                        <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
                                                            <div className="lg:col-span-12 max-sm:col-span-1 pt-3 ">
                                                                <label htmlFor="seo_title"> Seo Title</label>
                                                                <InputCustom name="seo_title" />
                                                            </div>
                                                            <div className="lg:col-span-12 max-sm:col-span-1 ">
                                                                <label htmlFor="seo_description">Seo Description</label>
                                                                <TextAreaField name="seo_description" />
                                                            </div>
                                                            <div className="lg:col-span-12 max-sm:col-span-1 ">
                                                                <UploadImage name="seo_image" />

                                                            </div>
                                                        </div>
                                                    </Tab.Panel>

                                                    <Tab.Panel>
                                                        <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
                                                            <div className="lg:col-span-12 max-sm:col-span-1 pt-3 ">
                                                                <label htmlFor="facebook_title"> Facebook Title</label>
                                                                <InputCustom name="facebook_title" />
                                                            </div>
                                                            <div className="lg:col-span-12 max-sm:col-span-1 ">
                                                                <label htmlFor="seo_description">Facebook Description</label>
                                                                <TextAreaField name="facebook_description" />
                                                            </div>
                                                            <div className="lg:col-span-12 max-sm:col-span-1 ">
                                                                <UploadImage name="facebook_image" />
                                                            </div>
                                                        </div>
                                                    </Tab.Panel>

                                                    <Tab.Panel>
                                                        <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
                                                            <div className="lg:col-span-12 max-sm:col-span-1 pt-3 ">
                                                                <label htmlFor="twitter_title"> Twitter Title</label>
                                                                <InputCustom name="twitter_title" />
                                                            </div>
                                                            <div className="lg:col-span-12 max-sm:col-span-1 ">
                                                                <label htmlFor="twitter_description">Twitter Description</label>
                                                                <TextAreaField name="twitter_description" />
                                                            </div>
                                                            <div className="lg:col-span-12 max-sm:col-span-1 ">
                                                                <UploadImage name="twitter_image" />
                                                            </div>
                                                        </div>
                                                    </Tab.Panel>
                                                </Tab.Panels>
                                            </Tab.Group>
                                        </div>
                                    ) : null}

                                </div>
                            </div>
                            <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 pb-5">
                                <h5 className="mb-5 w-[100%] text-base font-semibold dark:text-white p-2  border-b border-dashed border-white-light">Publish</h5>
                                <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
                                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                                        <RadioCustom name="status" publish={publish} />
                                    </div>
                                </div>
                            </div>

                            <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 pb-5">
                                <h5 className="mb-5 w-[100%] text-base font-semibold dark:text-white p-2  border-b border-dashed border-white-light">Feature Image</h5>
                                <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
                                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                                        <UploadImage updateData={pageData} name="featured_image" />

                                    </div>
                                </div>
                            </div>

                           
       </div>


            <div className="lg:col-span-12 max-sm:col-span-1 ">
                <Button variant='primary' type='submit' loading={loadingUpdate || postLoading}>
                    submit
                </Button>
            </div>
        </div>
    );
}
