import React, { useEffect } from 'react'
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
import { useMutate } from '../../hooks/UseMutate';

const role = [
    { value: 'user', label: 'user' },
    { value: 'admin', label: 'admin' },

];
const gender = [
    { value: 'male', label: 'male' },
    { value: 'female', label: 'female' },

];
const options = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },

];



type PageCustom_TP = {
    showAddForm?: boolean;
    setShowAddForm?:any;
    pageData?:any

  };

const AddPage = ({showAddForm,setShowAddForm,pageData}:PageCustom_TP) =>
    {
        console.log("🚀 ~ file: AddPage.tsx:29 ~ AddPage ~ pageData:", pageData)
        const themeConfig = useSelector((state: IRootState) => state.themeConfig);
        const dispatch = useDispatch();
        const [currentImage, setCurrentImage] = useState<File>();
        const [previewImage, setPreviewImage] = useState<string>('');
        const [seoSection,setSeoSection] = useState<any>('yes')
        const [editorValue, setEditorValue] = useState('');
        const [formValues, setFormValues] = useState({
            name: '',
            username: '',
            avatar: '',
            status: '',
            email: '',
            phone: '',
            password: '',
            gender: '',
            country: '',
            bio: '',
        });
        editorValue;

   

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormValues({ ...formValues, [e.currentTarget.name]: e.currentTarget.value });
            console.log(formValues);
        };

        const handleQuillEdit = (value: string) => {
            setFormValues((prev) => {
                return {
                    ...prev,
                    bio: value,
                };
            });
            console.log(formValues);
        };

        const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFiles = event.target.files as FileList;
            setCurrentImage(selectedFiles?.[0]);
            setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
            console.log(previewImage, 'hey');
            setFormValues((prev: any) => {
                return {
                    ...prev,
                    avatar: selectedFiles?.[0],
                };
            });
            console.log(currentImage,'lll');
        };

        const validatopnSchema = () =>
            Yup.object({
                name: Yup.string().trim().required('faild os requerd'),
                email: Yup.string().trim().required('sdrfgv'),
            });

        const initialValues = {
            name: pageData?.name ? pageData?.name : '',
            username: pageData?.username ? pageData?.username : '',

        };

        // post data
        const { mutate } = useMutate({
            mutationKey: ['teachers/id'],
            endpoint: `dashboard/user/store`,
            onSuccess: (data: any) => {
                console.log('done');
            },
            onError: (err: any) => {
                console.log('error', err);
            },
            formData: true,
        });
        // update
        const { mutate: update } = useMutate({
            mutationKey: ['users/id'],
            endpoint: `/api/user/store`,
            onSuccess: (data: any) => {
                console.log('done');
            },
            onError: (err: any) => {
                console.log('error', err);
            },
            formData: true,
        });

        const handleSubmit = (values:any) =>{
            axios.post(`https://dashboard.savvyhost.io/dashboard/user/store`,values, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  "Authorization": `Bearer ${localStorage.getItem('token')}`,
                }
              })
                .then(response => {
                  console.log(response,"added")
                  Swal.fire({ title: 'add!', text: 'Your file has been added successfully.', icon: 'success', customClass: 'sweet-alerts' });
                }
                ).catch((err) => {
                    Swal.fire({ title: 'Sorry!', text: 'User can not be added .', icon: "error", customClass: 'sweet-alerts' });
                    console.log(err,'err')
                 })
        }

  return (
    <div>
    <div className={`${(showAddForm && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`} onClick={() => setShowAddForm(false)}></div>

    <nav
        className={`${
            (showAddForm && 'ltr:!right-0 rtl:!left-0') || ''
        } bg-white fixed ltr:-right-[50%] rtl:-left-[50%] top-0 bottom-0 w-full max-w-[50%] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 z-[51] dark:bg-black p-4`}
    >

        <div className="overflow-y-auto overflow-x-hidden perfect-scrollbar h-full">
            <div className="text-center relative pb-5">
                <button type="button" className="absolute top-0 ltr:right-0 rtl:left-0 opacity-30 hover:opacity-100 dark:text-white" onClick={() => setShowAddForm(false)}>
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
            <form >
            <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 pb-5">
              <h5 className="mb-5 w-[100%] text-base font-semibold dark:text-white p-2  border-b border-dashed border-white-light">News content</h5>
                <div className='grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ' >
                   <div className='lg:col-span-12 max-sm:col-span-1 '>
                        <label htmlFor="Name"> Name</label>
                        <input id="Name" type="text" placeholder="" defaultValue="" className="form-input" />
                    </div>
                    <div className='lg:col-span-12 max-sm:col-span-1 '>
                        <label htmlFor="Bio">Bio</label>
                        <ReactQuill theme="snow"/>
                    </div>


                </div>
            </div>

            <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 ">
              <h5 className="mb-5 w-[100%] text-base font-semibold dark:text-white p-2  border-b border-dashed border-white-light">Seo Manager</h5>
              <p className="text-white-dark pb-2 px-2 text-sm">Allow search engines to show this service in search results?</p>
                <div className='grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ' >
                   <div className='lg:col-span-12 max-sm:col-span-1 pt-1'>
                        <Select defaultValue={options[0]} options={options} onChange={(event)=>{setSeoSection(event?.value)}} isSearchable={false} />
                    </div>
                    {seoSection === "yes" ?
                        <div className='lg:col-span-12 max-sm:col-span-1 '>
                             <Tab.Group>
                                <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''}
                                                    dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
                                            >
                                                General
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''}
                                                    dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
                                            >
                                                Facebook
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''}
                                                    dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
                                            >
                                                Twitter
                                            </button>
                                        )}
                                    </Tab>

                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel>
                                    <div className='grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ' >
                                        <div className='lg:col-span-12 max-sm:col-span-1 pt-3 '>
                                            <label htmlFor="SeoTitle"> Seo Title</label>
                                            <input id="SeoTitle" type="text" placeholder="" defaultValue="" className="form-input" />
                                        </div>
                                        <div className='lg:col-span-12 max-sm:col-span-1 '>
                                            <label htmlFor="SeoDescription">Seo Description</label>
                                            <textarea id="SeoDescription"  className="form-input" />
                                        </div>
                                        <div className='lg:col-span-12 max-sm:col-span-1 '>
                                           <input className='mb-3 form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:rounded-s-lg file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary ' type="file" accept="image/*" onChange={selectImage} />
                                           {previewImage ?
                                                <div>
                                                <img  className="preview w-[50%] m-auto" src={previewImage} alt="" />
                                                </div>
                                                :
                                                <div>
                                                <img className="preview w-[50%] m-auto" src="/assets/images/file-preview.svg" alt="" />
                                                </div>
                                            }
                                        </div>

                                    </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <div className='grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ' >
                                            <div className='lg:col-span-12 max-sm:col-span-1 pt-3 '>
                                                <label htmlFor="SeoTitle"> Facebook Title</label>
                                                <input id="SeoTitle" type="text" placeholder="" defaultValue="" className="form-input" />
                                            </div>
                                            <div className='lg:col-span-12 max-sm:col-span-1 '>
                                                <label htmlFor="SeoDescription">Facebook Description</label>
                                                <textarea id="SeoDescription"  className="form-input" />
                                            </div>
                                            <div className='lg:col-span-12 max-sm:col-span-1 '>
                                           <input className='mb-3 form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:rounded-s-lg file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary ' type="file" accept="image/*" onChange={selectImage} />
                                           {previewImage ?
                                                <div>
                                                <img  className="preview w-[50%] m-auto" src={previewImage} alt="" />
                                                </div>
                                                :
                                                <div>
                                                <img className="preview w-[50%] m-auto" src="/assets/images/file-preview.svg" alt="" />
                                                </div>
                                            }
                                        </div>
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <div className='grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ' >
                                                <div className='lg:col-span-12 max-sm:col-span-1 pt-3 '>
                                                    <label htmlFor="SeoTitle">Twitter Title</label>
                                                    <input id="SeoTitle" type="text" placeholder="" defaultValue="" className="form-input" />
                                                </div>
                                                <div className='lg:col-span-12 max-sm:col-span-1 '>
                                                    <label htmlFor="SeoDescription">Twitter Description</label>
                                                    <textarea id="SeoDescription"  className="form-input" />
                                                </div>
                                                <div className='lg:col-span-12 max-sm:col-span-1 '>
                                                <input className='mb-3 form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:rounded-s-lg file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary ' type="file" accept="image/*" onChange={selectImage} />
                                                {previewImage ?
                                                        <div>
                                                        <img  className="preview w-[50%] m-auto" src={previewImage} alt="" />
                                                        </div>
                                                        :
                                                        <div>
                                                        <img className="preview w-[50%] m-auto" src="/assets/images/file-preview.svg" alt="" />
                                                        </div>
                                                    }
                                            </div>
                                        </div>
                                    </Tab.Panel>

                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    :
                        null
                    }


                </div>
            </div>

            <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 pb-5">
              <h5 className="mb-5 w-[100%] text-base font-semibold dark:text-white p-2  border-b border-dashed border-white-light">Publish</h5>
                <div className='grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ' >
                   <div className='lg:col-span-12 max-sm:col-span-1 '>
                    <div className='flex flex-row items-center'>
                        <label className="mr-5">
                            <input type="radio" name="default_radio" className="form-radio" defaultChecked />
                            <span> Publish</span>
                        </label>
                        <label className="">
                            <input type="radio" name="default_radio" className="form-radio" defaultChecked />
                            <span> Draft</span>
                        </label>
                    </div>
                    </div>

                </div>
            </div>

            <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 pb-5">
              <h5 className="mb-5 w-[100%] text-base font-semibold dark:text-white p-2  border-b border-dashed border-white-light">Feature Image</h5>
                <div className='grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ' >
                   <div className='lg:col-span-12 max-sm:col-span-1 '>
                        <input className='mb-3 form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:rounded-s-lg file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary ' type="file" accept="image/*" onChange={selectImage} />
                        {previewImage ?
                            <div>
                                <img  className="preview w-[50%] m-auto" src={previewImage} alt="" />
                            </div>
                            :
                            <div>
                                <img className="preview w-[50%] m-auto" src="/assets/images/file-preview.svg" alt="" />
                            </div>
                        }
                    </div>

                </div>
            </div>


            <div className='lg:col-span-12 max-sm:col-span-1 '>
                       <button type="button" className="btn btn-primary w-full"> Save</button>
                    </div>
            </form>
        </div>
    </nav>
</div>
  )
}

export default AddPage
