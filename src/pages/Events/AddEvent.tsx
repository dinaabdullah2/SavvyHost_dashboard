
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Select from 'react-select';
import { toggleAnimation, toggleLayout, toggleMenu, toggleNavbar, toggleRTL, toggleTheme, toggleSemidark } from '../../store/themeConfigSlice';
import ReactQuill from 'react-quill';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import InputCustom from '../../components/atoms/InputCustom';
import Editor from '../../components/atoms/Editor';
import SelectCustom from '../../components/atoms/SelectCustom';
import { useMutate } from '../../hooks/UseMutate';
import { TextAreaField } from '../../components/atoms/TextAreaField';
import UploadImage from '../../components/atoms/UploadImage';
import RadioCustom from '../../components/atoms/RadioCustom';
import { useQueryClient } from '@tanstack/react-query';
import DateInput from '../../components/atoms/DateInput';
const role = [
    { value: 'user', label: 'user' },
    { value: 'admin', label: 'admin' },

];
const publish = [
    { value: 'publish', label: 'publish' },
    { value: 'draft', label: 'draft' },

];
const options = [

    { value: 1, label: 'Yes' },
    { value: 0, label: 'No' },

];

type EventCustom_TP = {
    showAddEventForm?: boolean;
    setShowAddEventForm?:any
    eventData?: any;
    refetch?:any

  };

const AddEvent = ({
    showAddEventForm,
    setShowAddEventForm,
    eventData,
    refetch

  }:EventCustom_TP) => {

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const [seoSection, setSeoSection] = useState<any>(1);
    const [currentImage, setCurrentImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string>("");
    const[value,setValue]= useState('')




    const validatopnSchema = () =>
        Yup.object({
            title: Yup.string().trim().required('faild os requerd'),
        });
        const initialValues = {
            title: eventData?.title ? eventData?.title : '',
            content: eventData?.content ? eventData?.content : '',
            avatar: eventData?.avatar ? eventData?.avatar : '',
            image :eventData?.image ? eventData?.image : '',
            status: eventData?.status ? eventData?.status : 'publish',
            searchable: eventData?.searchable ? eventData?.searchable : 1,
            seo_title: eventData?.seo_title ? eventData?.seo_title : '',
            seo_description: eventData?.seo_description ? eventData?.seo_description : '',
            seo_image: eventData?.seo_image ? eventData?.seo_image : '',
            facebook_title: eventData?.facebook_title ? eventData?.facebook_title : '',
            facebook_image: eventData?.facebook_image ? eventData?.facebook_image : '',
            facebook_description: eventData?.facebook_description ? eventData?.facebook_description : '',
            twitter_title: eventData?.twitter_title ? eventData?.twitter_title : '',
            twitter_image: eventData?.twitter_image ? eventData?.twitter_image : '',
            twitter_description: eventData?.twitter_description ? eventData?.twitter_description : '',
            location:eventData?.location ? eventData?.location : '',
            start_date:eventData?.start_date ? eventData?.start_date : '',
            end_date:eventData?.end_date ? eventData?.end_date : '',
        };


    const queryClient = useQueryClient();
    // // post data
    const { mutate } = useMutate({
        mutationKey: ['event/id'],
        endpoint: `api/dashboard/event/store`,
        onSuccess: (data: any) => {
            Swal.fire({ title: 'Added!', text: 'Your Event has been added successfully.', icon: 'success', customClass: 'sweet-alerts' });
            queryClient.refetchQueries(['api/dashboard/event/index']);
            refetch();
            setShowAddEventForm(false)
            console.log('donedsssssssssssssssssssssssafcdfsdfas ');
        },
        onError: (err: any) => {
            Swal.fire({ title: 'Your Event Can not be added.', text: `${err.response.data.message}` ,icon: 'error', customClass: 'sweet-alerts' });
            console.log('erroooooooooooooooooooooooooooooooor', err);
        },
        formData: true,
    });

    // // update
    // const { mutate: update } = useMutate({
    //     mutationKey: ['users/id'],
    //     endpoint: `/api/user/store`,
    //     onSuccess: (data: any) => {
    //         console.log('done');
    //     },
    //     onError: (err: any) => {
    //         console.log('error', err);
    //     },
    //     formData: true,
    // });



  return (
    <div>
    <div className={`${(showAddEventForm && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`} onClick={() => setShowAddEventForm(false)}></div>

    <nav
        className={`${
            (showAddEventForm && 'ltr:!right-0 rtl:!left-0') || ''
        } bg-white fixed ltr:-right-[50%] rtl:-left-[50%] top-0 bottom-0 w-full lg:max-w-[50%]  sm:max-w-[80%]  sm:ltr:-right-[80%] max-sm:rtl:-left-[90%]  max-sm:max-w-[90%]  max-sm:ltr:-right-[90%] sm:rtl:-left-[80%]  shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 z-[51] dark:bg-black p-4`}
    >

        <div className="overflow-y-auto overflow-x-hidden perfect-scrollbar h-full">
            <div className="text-center relative pb-5">
                <button type="button" className="absolute top-0 ltr:right-0 rtl:left-0 opacity-30 hover:opacity-100 dark:text-white" onClick={() => setShowAddEventForm(false)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <h4 className="mb-1 dark:text-white font-semibold text-lg">Add New Event </h4>

            </div>
            <Formik
                    initialValues={initialValues}
                    validationSchema={validatopnSchema}
                    onSubmit={(values) => {
                        mutate({ ...values });
                        // update({ ...values, _methode: 'put' });
                    }}
                    >
                        <Form>
                            <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 pb-5">
                                <h5 className="mb-5 w-[100%] text-base font-semibold dark:text-white p-2  border-b border-dashed border-white-light">News content</h5>
                                <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
                                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                                        <label htmlFor="title"> Title</label>
                                        <InputCustom name="title" />
                                    </div>
                                    <div className="lg:col-span-6 max-sm:col-span-1 ">
                                        <label htmlFor="start_date"> start Date</label>
                                        <DateInput name="start_date"  />
                                    </div>
                                    <div className="lg:col-span-6 max-sm:col-span-1 ">
                                        <label htmlFor="end_date"> End Date</label>
                                        <DateInput name="end_date"  />
                                    </div>
                                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                                        <label htmlFor="name"> Location</label>
                                        <InputCustom name="location" type='text' />
                                    </div>
                                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                                        <label htmlFor="content">Content</label>
                                        <Editor name="content" />
                                    </div>
                                </div>
                            </div>

                            <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 ">
                                <h5 className="mb-5 w-[100%] text-base font-semibold dark:text-white p-2  border-b border-dashed border-white-light">Seo Manager</h5>
                                <p className="text-white-dark pb-2 px-2 text-sm">Allow search engines to show this service in search results?</p>
                                <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
                                    <div className="lg:col-span-12 max-sm:col-span-1 pt-1 pb-2">
                                        <SelectCustom setSeoSection={setSeoSection} options={options} name="searchable"  />
                                    </div>
                                    {seoSection == 1 ?
                                        <div className="lg:col-span-12 max-sm:col-span-1 ">
                                            <Tab.Group>
                                                <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                className={`${
                                                                    selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''
                                                                }
                                                            dark:hover:border-b-black -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
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
                                                                }
                                                            dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
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
                                                                }
                                                            dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
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
                                                                 <UploadImage name='seo_image' />

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
                                                                 <UploadImage name='facebook_image' />
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
                                                                 <UploadImage name='twitter_image' />
                                                            </div>
                                                        </div>
                                                    </Tab.Panel>
                                                </Tab.Panels>
                                            </Tab.Group>
                                        </div>
                                     : null}
                                </div>
                            </div>

                            <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 pb-5">
                                <h5 className="mb-5 w-[100%] text-base font-semibold dark:text-white p-2  border-b border-dashed border-white-light">Publish</h5>
                                <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
                                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                                        <RadioCustom name="status" publish={publish}  />
                                    </div>
                                </div>
                            </div>

                            <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 pb-5">
                                <h5 className="mb-5 w-[100%] text-base font-semibold dark:text-white p-2  border-b border-dashed border-white-light">Image</h5>
                                <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
                                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                                       <UploadImage name='image'  />
                                    </div>
                                </div>
                            </div>

                            <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 pb-5">
                                <h5 className="mb-5 w-[100%] text-base font-semibold dark:text-white p-2  border-b border-dashed border-white-light">Avatar</h5>
                                <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
                                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                                       <UploadImage name='avatar'  />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-full">
                                Save
                            </button>
                        </Form>
                    </Formik>



        </div>
    </nav>
</div>
  )
}

export default AddEvent
