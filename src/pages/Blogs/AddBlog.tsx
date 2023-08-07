import { Tab } from '@headlessui/react';
import { useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import Editor from '../../components/atoms/Editor';
import InputCustom from '../../components/atoms/InputCustom';
import RadioCustom from '../../components/atoms/RadioCustom';
import SelectCustom from '../../components/atoms/SelectCustom';
import { TextAreaField } from '../../components/atoms/TextAreaField';
import UploadImage from '../../components/atoms/UploadImage';
import { useMutate } from '../../hooks/UseMutate';
import { IRootState } from '../../store';
import SelectSearch from '../../components/atoms/SelectSearchable';
import useFetch from '../../hooks/UseFetch';
import MultiSelection from '../../components/atoms/MultiSelection';
import SelectCategory from '../../components/atoms/SelectCategory';
import SelectAuthor from '../../components/atoms/SelectAuthor';

const role = [
    { value: 'user', label: 'user' },
    { value: 'admin', label: 'admin' },
];
const publish = [
    { value: 'publish', label: 'publish' },
    { value:  'draft', label: 'draft' },
];
const options = [
    { value: 1, label: 'Yes' },
    { value: 0, label: 'No' },
];



type BlogCustom_TP = {
    showAddBlogForm?: boolean;
    setShowAddBlogForm?:any;
    blogData?: any;
    refetch?: any;

  };

const AddBlog = ({
    showAddBlogForm,
    setShowAddBlogForm,
    blogData,
    refetch
  }:BlogCustom_TP) => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const [currentImage, setCurrentImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string>('');
    const [seoSection, setSeoSection] = useState<any>(1);

    const validatopnSchema = () =>
        Yup.object({
            title: Yup.string().trim().required('faild os requerd'),
        });

    const initialValues = {
        title: blogData?.title ? blogData?.title : '',
        content: blogData?.content ? blogData?.content : '',
        // tags: blogData?.tags ? blogData?.tags : '',
        tags: [],
        image: blogData?.featured_image ? blogData?.image : '',
        status: blogData?.status ? blogData?.status : 'publish',
        searchable: blogData?.searchable ? blogData?.searchable : 1,
        seo_title: blogData?.seo_title ? blogData?.seo_title : '',
        seo_description: blogData?.seo_description ? blogData?.seo_description : '',
        seo_image: blogData?.seo_image ? blogData?.seo_image : '',
        facebook_title: blogData?.facebook_title ? blogData?.facebook_title : '',
        facebook_image: blogData?.facebook_image ? blogData?.facebook_image : '',
        facebook_description: blogData?.facebook_description ? blogData?.facebook_description : '',
        twitter_title: blogData?.twitter_title ? blogData?.twitter_title : '',
        twitter_image: blogData?.twitter_image ? blogData?.twitter_image : '',
        twitter_description: blogData?.twitter_description ? blogData?.twitter_description : '',
        category_id:blogData?.category_id ? blogData?.category_id : '',
        user_id:blogData?.user_id ? blogData?.user_id : '',
    };




    interface Category {
        id: number;
        name: string,
        // Add more properties if needed...
      }
    const {
        data: Categories,
    } = useFetch<{
        data: {
            categories: Category[];
        };
    }>({
        endpoint: `api/dashboard/blog/create`,
        queryKey: [`All-Categories`],
    });
    console.log(Categories?.data?.categories);









    const queryClient = useQueryClient();
    // // post data
    const { mutate } = useMutate({
        mutationKey: ['pages/id'],
        endpoint: `api/dashboard/blog/store`,
        onSuccess: (data: any) => {
            Swal.fire({ title: 'Added!', text: 'Your Blog has been added.', icon: 'success', customClass: 'sweet-alerts' });
            queryClient.refetchQueries(['api/dashboard/blog']);
            refetch();
            setShowAddBlogForm(false);
            console.log(data);
        },
        onError: (err: any) => {
            Swal.fire({ title: 'Your Blog Can not be added!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
            console.log('error', err);
        },
        formData: true,
    });

    // // update
    const { mutate: update } = useMutate({
        mutationKey: ['Blogs/id'],
        endpoint: `api/dashboard/blog/${blogData?.id}`,
        onSuccess: (data: any) => {
            Swal.fire({ title: 'Updated!', text: 'Blog has been updated.', icon: 'success', customClass: 'sweet-alerts' });
            queryClient.refetchQueries(['api/dashboard/blog']);
            refetch();
            setShowAddBlogForm(false)

        },
        onError: (err: any) => {
            Swal.fire({ title: 'Blog Can not be Updated!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
        },
        formData: true,
    });


  return (
    <div>
    <div className={`${(showAddBlogForm && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`} onClick={() => setShowAddBlogForm(false)}></div>

    <nav
        className={`${
            (showAddBlogForm && 'ltr:!right-0 rtl:!left-0') || ''
        } bg-white fixed ltr:-right-[50%] rtl:-left-[50%] top-0 bottom-0 w-full lg:max-w-[50%]  sm:max-w-[80%]  sm:ltr:-right-[80%] max-sm:rtl:-left-[90%]  max-sm:max-w-[90%]  max-sm:ltr:-right-[90%] sm:rtl:-left-[80%]  shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 z-[51] dark:bg-black p-4`}
    >

        <div className="overflow-y-auto overflow-x-hidden perfect-scrollbar h-full">
            <div className="text-center relative pb-5">
                <button type="button" className="absolute top-0 ltr:right-0 rtl:left-0 opacity-30 hover:opacity-100 dark:text-white" onClick={() => setShowAddBlogForm(false)}>
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

                <h4 className="mb-1 dark:text-white font-semibold text-lg">Add New Blog </h4>

            </div>
            <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={validatopnSchema}
                        onSubmit={(values) => {
                            mutate({ ...values });
                            update({ ...values, _methode: 'put' });
                        }}
                    >
                        <Form>
                            <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 pb-5">
                                <h5 className="mb-5 w-[100%] text-base font-semibold dark:text-white p-2  border-b border-dashed border-white-light">News content</h5>
                                <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
                                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                                        <label htmlFor="title"> Name</label>
                                        <InputCustom name="title" />
                                    </div>
                                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                                        <label htmlFor="content">Bio</label>
                                        <Editor name="content" />
                                    </div>


                                </div>
                            </div>

                            <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 ">
                                <h5 className="mb-5 w-[100%] text-base font-semibold dark:text-white p-2  border-b border-dashed border-white-light">Seo Manager</h5>
                                <p className="text-white-dark pb-2 px-2 text-sm">Allow search engines to show this service in search results?</p>
                                <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
                                    <div className="lg:col-span-12 max-sm:col-span-1 pt-1">
                                        <SelectSearch   setSeoSection={setSeoSection}  name="searchable" />
                                    </div>
                                    {seoSection == 1 ? (
                                        <div className="lg:col-span-12 max-sm:col-span-1 ">
                                            <Tab.Group>
                                                <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                className={`${
                                                                    selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''
                                                                }
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
                                <h5 className="mb-5 w-[100%] text-base font-semibold dark:text-white p-2  border-b border-dashed border-white-light">Author Setting</h5>
                                <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">

                                        <div className="lg:col-span-12 max-sm:col-span-1 ">
                                            <label htmlFor="tags">Author</label>
                                            <SelectAuthor name="user_id"  />

                                        </div>
                                       <div className="lg:col-span-12 max-sm:col-span-1 ">
                                            <label htmlFor="tags">Category</label>
                                            <SelectCategory name="category_id"  />

                                        </div>
                                        {/* <div className="lg:col-span-12 max-sm:col-span-1 ">
                                            <label htmlFor="tags">Add Tags</label>
                                            {/* <Field type="text" name="tags[]" as="textarea"  /> */}
                                            {/* <InputCustom name="tags" />
                                        </div> */}
{/*
                                        <div className="lg:col-span-12 max-sm:col-span-1 ">
                                            <label htmlFor="tags">Choose Tags</label>
                                            <MultiSelection name="tags" />
                                        </div> */}
                                </div>
                            </div>


                            <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 pb-5">
                                <h5 className="mb-5 w-[100%] text-base font-semibold dark:text-white p-2  border-b border-dashed border-white-light">Feature Image</h5>
                                <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
                                    <div className="lg:col-span-12 max-sm:col-span-1 ">
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
  )
}

export default AddBlog
