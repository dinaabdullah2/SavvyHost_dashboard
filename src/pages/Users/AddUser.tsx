import { useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import Editor from '../../components/atoms/Editor';
import InputCustom from '../../components/atoms/InputCustom';
import PhoneInput2 from '../../components/atoms/PhoneInput';
import SelectCountries from '../../components/atoms/SelectCountries';
import SelectCustom from '../../components/atoms/SelectCustom';
import SelectRole from '../../components/atoms/SelectRole';
import UploadImage from '../../components/atoms/UploadImage';
import useFetch from '../../hooks/UseFetch';
import { useMutate } from '../../hooks/UseMutate';
import SelectGender from '../../components/atoms/SelectGender';
import SelectStatus from '../../components/atoms/SelectStatus';
import SelectType from '../../components/atoms/SelectType';


type UserCustom_TP = {
    showCustomizer?: boolean;
    setShowCustomizer?: any;
    userData?: any;
};

const AddUser = ({ showCustomizer, setShowCustomizer, userData }: UserCustom_TP) => {
    console.log('🚀 ~ file: AddUser.tsx:29 ~ AddUser ~ userData:', userData);
    interface Country {
        id: number;
        country_code: string;
        country_name: string;
    }
    const {
        data: Countries,
        refetch,
    } = useFetch<{
        data: {
            countries: Country[];
        };
    }>({
        endpoint: `api/dashboard/user/create`,
        queryKey: [`All-Countries`],
    });
    interface Role {
        id: number;
        role_name: string;
        // Add more properties if needed...
    }
    const { data: Roles } = useFetch<{
        data: {
            roles: Role[];
        };
    }>({
        endpoint: `api/dashboard/user/create`,
        queryKey: [`All-Roles`],
    });

    const validatopnSchema = () =>
        Yup.object({
            name: Yup.string().trim().required('faild os requerd'),
            email: Yup.string().trim().required('sdrfgv'),
        });
    const queryClient = useQueryClient();
    // post data
    const { mutate } = useMutate({
        mutationKey: ['users/id'],
        endpoint: `api/dashboard/user/store`,
        onSuccess: (data: any) => {
            Swal.fire({ title: 'Added!', text: 'User has been added.', icon: 'success', customClass: 'sweet-alerts' });
            queryClient.refetchQueries(['dashboard/user/index']);
            refetch();
            setShowCustomizer(false);
            console.log(data);
        },
        onError: (err: any) => {
            Swal.fire({ title: 'User Can not be added!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
            console.log('error', err);
        },
        formData: true,
    });
    // update
    const { mutate: update } = useMutate({
        mutationKey: ['users/id'],
        endpoint: `api/dashboard/user/update/${userData?.id}`,
        onSuccess: (data: any) => {
            Swal.fire({ title: 'Updated!', text: 'User has been updated.', icon: 'success', customClass: 'sweet-alerts' });
            queryClient.refetchQueries(['dashboard/user/index']);
            refetch();
            setShowCustomizer(false);
            console.log(data);
        },
        onError: (err: any) => {
            Swal.fire({ title: 'User Can not be Updated!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
        },
        formData: true,
    });

    const initialValues = {
        name: userData?.name || '',
        username: userData?.username || '',
        avatar: userData?.avatar || '',
        status: userData?.status ? userData?.status : '',
        email: userData?.email ? userData?.email : '',
        phone: userData?.phone ? userData?.phone : '',
        password: userData?.password ? userData?.password : '',
        gender:userData?.gender || '',
        country_id: userData?.country_id || '',
        bio: userData?.bio ? userData?.bio : '',
        type: userData?.type || '',
        role_id: userData?.role ? userData?.role : '',
    };



    const gender = [
        { value: 1, label:  'Male' },
        { value: 0, label: 'Female' },
    ];
    const status = [
        { value: 'active', label: 'Active' },
        { value: 'suspend', label: 'Suspend' },
    ];

    const type = [
        { value: 'Traveler', label: 'Traveler' },
        { value: 'Company', label: 'Company' },
    ];


    return (
        <div>
            <div className={`${(showCustomizer && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`} onClick={() => setShowCustomizer(false)}></div>

            <nav
                className={`${
                    (showCustomizer && 'ltr:!right-0 rtl:!left-0') || ''
                } bg-white fixed ltr:-right-[50%] rtl:-left-[50%] top-0 bottom-0 w-full lg:max-w-[50%]  sm:max-w-[80%]  sm:ltr:-right-[80%] max-sm:rtl:-left-[90%]  max-sm:max-w-[90%]  max-sm:ltr:-right-[90%] sm:rtl:-left-[80%]  shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 z-[51] dark:bg-black p-4`}
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

                        <h4 className="mb-1 dark:text-white font-semibold text-lg">Add New User </h4>
                    </div>

                    <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validatopnSchema}
                            enableReinitialize={true}
                            // onSubmit={(values) => {handleSubmit(values)}}
                            onSubmit={(values) => {
                                console.log('values', values.bio);
                                mutate({ ...values });
                                update({ ...values, _methode: 'put' });
                            }}
                        >
                            <Form>
                                <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 ">

                                    <div className="lg:col-span-6 max-sm:col-span-1 ">
                                        <label htmlFor="name">Full Name</label>
                                        <InputCustom  type="text" name="name" />

                                    </div>
                                    <div className="lg:col-span-6 max-sm:col-span-1 ">
                                        <label htmlFor="username">Username</label>
                                        <InputCustom type="text" name="username" />
                                    </div>
                                    <div className="lg:col-span-6 max-sm:col-span-1 ">
                                        <label htmlFor="email">Email</label>
                                        <InputCustom type="text" name="email" />
                                    </div>
                                    <div className="lg:col-span-6 max-sm:col-span-1 ">
                                        <label htmlFor="password">Password</label>
                                        <InputCustom type="password" name="password" />
                                    </div>
                                    <div className="lg:col-span-6 max-sm:col-span-1 ">
                                        <label htmlFor="phone">Phone Number</label>
                                        <PhoneInput2 updateData={userData} name="phone" resetForm="resetForm" />
                                    </div>
                                    <div className="lg:col-span-6 max-sm:col-span-1 ">
                                        <label htmlFor="Country">Country</label>
                                        <SelectCountries updateData={userData} name="country_id"  resetForm="resetForm"  />
                                    </div>
                                    <div className="lg:col-span-6 max-sm:col-span-1 ">
                                        <label htmlFor="Country">Gender</label>
                                        <SelectGender  updateData={userData}  name="gender" resetForm="resetForm"  />
                                    </div>
                                    <div className="lg:col-span-6 max-sm:col-span-1 ">
                                        <label htmlFor="Role">Role</label>
                                        <SelectRole  name="role_id" />
                                    </div>
                                    <div className="lg:col-span-6 max-sm:col-span-1 ">
                                        <label htmlFor="type">Type</label>
                                        <SelectType  name="type" />
                                    </div>
                                    <div className="lg:col-span-6 max-sm:col-span-1 ">
                                        <label htmlFor="status">Status</label>
                                        <SelectStatus  name="status" />
                                    </div>
                                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                                        <label htmlFor="Bio">Bio</label>
                                        <Editor name="bio" />
                                    </div>
                                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                                        <label  htmlFor="avatar">Image</label>
                                        <UploadImage updateData={userData} name="avatar" />
                                    </div>

                                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                                        <button type="submit" className="btn btn-primary w-full">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>


                    </div>
                </div>
            </nav>
        </div>
    );
};

export default AddUser;
