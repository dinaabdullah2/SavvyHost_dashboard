import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Select from 'react-select';
import { toggleAnimation, toggleLayout, toggleMenu, toggleNavbar, toggleRTL, toggleTheme, toggleSemidark } from '../../store/themeConfigSlice';
import ReactQuill from 'react-quill';
import InputCustom from '../../components/atoms/InputCustom';

const role = [
    { value: 'user', label: 'user' },
    { value: 'admin', label: 'admin' },

];
const gender = [
    { value: 'male', label: 'male' },
    { value: 'female', label: 'female' },

];
const country = [
    { value: 'egypt', label: 'egypt' },
    { value: 'korea', label: 'korea' },

];


type UserEdit_TP = {
    showEditForm?: boolean;
    setShowEditForm?:any;
    userData?:any

  };
const EditUser = ({
    showEditForm,
    setShowEditForm,
    userData
  }:UserEdit_TP) => {

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const [formValues,setFormValues]=useState({
        name:'',
        username:'',
        avatar:'',
        status:'',
        email:'',
        phone:'',
        password:'',
        gender:'',
        country:'',
        bio:'',

    })

    useEffect(() => {
        setFormValues({
            name:userData?.name,
            username:userData?.username,
            avatar:userData?.avatar,
            status:userData?.status,
            email:userData?.email,
            phone:userData?.phone,
            password:userData?.password,
            gender:userData?.gender,
            country:userData?.country,
            bio:userData?.bio,

        })
    }, [userData]);
    console.log(formValues,'form')


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.currentTarget.name]: e.currentTarget.value })
        console.log(formValues)
      }

      const handleQuillEdit = (value:string) => {
        setFormValues((prev) => {
          return {
            ...prev,
            bio: value
          }
        })
        console.log(formValues)
      }


    // const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const selectedFiles = event.target.files as FileList;
    //     setCurrentImage(selectedFiles?.[0]);
    //     setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
    //     console.log(previewImage,'hey')
    //     setFormValues((prev:any) => {
    //         return {
    //           ...prev,
    //           avatar: selectedFiles?.[0]
    //         }
    //       })
    //       console.log(formValues)
    //   };


  return (
    <div>
    <div className={`${(showEditForm && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`} onClick={() => setShowEditForm(false)}></div>

    <nav
        className={`${
            (showEditForm && 'ltr:!right-0 rtl:!left-0') || ''
        } bg-white fixed ltr:-right-[50%] rtl:-left-[50%] top-0 bottom-0 w-full max-w-[50%] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 z-[51] dark:bg-black p-4`}
    >

        <div className="overflow-y-auto overflow-x-hidden perfect-scrollbar h-full">
            <div className="text-center relative pb-5">
                <button type="button" className="absolute top-0 ltr:right-0 rtl:left-0 opacity-30 hover:opacity-100 dark:text-white" onClick={() => setShowEditForm(false)}>
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

                <h4 className="mb-1 dark:text-white font-semibold text-lg">Edit User </h4>
            </div>

            <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
            <form>
                <div className='grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 ' >
                   <div className='lg:col-span-6 max-sm:col-span-1 '>
                        <label htmlFor="fullname">Full Name</label>
                        <InputCustom value={formValues.name} type='text' name='name' handleChange={handleChange} />
                    </div>
                    <div className='lg:col-span-6 max-sm:col-span-1 '>
                        <label htmlFor="Username">Username</label>
                        <input id="Username"  type="text" placeholder="" defaultValue="" className="form-input" />
                    </div>
                    <div className='lg:col-span-6 max-sm:col-span-1 '>
                        <label htmlFor="Email">Email</label>
                        <input id="Email" type='email' placeholder="" defaultValue="" className="form-input" />
                    </div>
                    <div className='lg:col-span-6 max-sm:col-span-1 '>
                        <label htmlFor="Password">Password</label>
                        <input id="Password" type="password" placeholder="" defaultValue="" className="form-input" />
                    </div>
                    <div className='lg:col-span-6 max-sm:col-span-1 '>
                        <label htmlFor="Phone">Phone</label>
                        <input id="Phone" type='Phone' placeholder="" defaultValue="" className="form-input" />
                    </div>
                    <div className='lg:col-span-6 max-sm:col-span-1 '>
                        <label htmlFor="Country">Country</label>
                        <Select defaultValue={country[0]} options={country} isSearchable={false} />
                    </div>
                    <div className='lg:col-span-6 max-sm:col-span-1 '>
                        <label htmlFor="Country">Gender</label>
                        <Select defaultValue={gender[0]} options={gender} isSearchable={false} />
                    </div>
                    <div className='lg:col-span-6 max-sm:col-span-1 '>
                        <label htmlFor="Role">Role</label>
                        <Select defaultValue={role[0]} options={role} isSearchable={false} />
                    </div>
                    <div className='lg:col-span-12 max-sm:col-span-1 '>
                        <label htmlFor="Bio">Bio</label>
                        <ReactQuill theme="snow"/>
                    </div>
                    <div className='lg:col-span-12 max-sm:col-span-1 '>
                       <button type="button" className="btn btn-primary w-full"> Save</button>
                    </div>

                </div>
            </form>

            </div>


        </div>
    </nav>
</div>
  )
}

export default EditUser
