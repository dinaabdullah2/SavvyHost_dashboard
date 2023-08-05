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


const role = [
    { value: 'user', label: 'user' },
    { value: 'admin', label: 'admin' },
];
const gender = [
    { value: 'male', label: 'male' },
    { value: 'female', label: 'female' },
];
const options = [

    { value: 1, label: 'Yes' },
    { value: 0, label: 'No' },

];

type PageCustom_TP = {
    showCustomizer?: boolean;
    setShowCustomizer?: any;
    categoryData?: any;
    refetch?:any;

};

const AddCategory = ({ showCustomizer, setShowCustomizer, categoryData,refetch}: PageCustom_TP) => {
    console.log('🚀 ~ file: AddPage.tsx:29 ~ AddPage ~ pageData:', categoryData);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const [currentImage, setCurrentImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string>('');
    const [seoSection, setSeoSection] = useState<any>(1);




    const validatopnSchema = () =>
        Yup.object({
            name: Yup.string().trim().required('faild os requerd'),
        });

    const initialValues = {
        name: categoryData?.name ? categoryData?.name : '',
        image: categoryData?.image ? categoryData?.image : '',
        slug: categoryData?.slug ? categoryData?.slug : '',

    }

    const queryClient = useQueryClient();
    // // post data
    const { mutate } = useMutate({
        mutationKey: ['category/id'],
        endpoint: `api/dashboard/category/store`,
        onSuccess: (data: any) => {
            Swal.fire({ title: 'Added!', text: 'Your Category has been added successfully.', icon: 'success', customClass: 'sweet-alerts' });
            queryClient.refetchQueries(['api/dashboard/category/index']);
            refetch();

            console.log('done');
        },
        onError: (err: any) => {
            Swal.fire({ title: 'Added!', text: 'Your Category Can not be added.', icon: 'error', customClass: 'sweet-alerts' });
            console.log('error', err);
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
            <div className={`${(showCustomizer && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`} onClick={() => setShowCustomizer(false)}></div>

            <nav
                className={`${
                    (showCustomizer && 'ltr:!right-0 rtl:!left-0') || ''
                } bg-white fixed ltr:-right-[50%] rtl:-left-[50%] top-0 bottom-0 w-full max-w-[50%] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 z-[51] dark:bg-black p-4`}
            >
                <div className="overflow-y-auto overflow-x-hidden perfect-scrollbar h-full">
                    <div className="text-center relative pb-5">
                        <button type="button" className="absolute top-0 ltr:right-0 rtl:left-0 opacity-30 hover:opacity-100 dark:text-white" onClick={() => setShowCustomizer(false)}>
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

                        <h4 className="mb-1 dark:text-white font-semibold text-lg">Add New Page </h4>
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
                                        <label htmlFor="name"> Name</label>
                                        <InputCustom name="name" type='text'  />
                                    </div>
                                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                                        <label htmlFor="slug"> Slug</label>
                                        <InputCustom name="slug" type='text' />
                                    </div>
                                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                                        <label htmlFor="slug"> Image</label>
                                        <UploadImage name="image" />
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
    );
};

export default AddCategory;

