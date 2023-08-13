import React from 'react';
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

export default function UserMainData({ userData, resetForm }: any) {
    const { setFieldValue } = useFormikContext();
    return (
        <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5">
            <div className="lg:col-span-6 max-sm:col-span-1 ">
                <label htmlFor="name">Full Name</label>
                <InputCustom type="text" name="name" />
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
                <SelectCountries
                    updateData={userData}
                    CountryName="country_id"
                    label="country"
                    resetForm={resetForm}
                    onChange={(option) => {
                        setFieldValue('country_id', option?.value);
                    }}
                />
            </div>
            <div className="lg:col-span-6 max-sm:col-span-1 ">
                <SelectGender
                    updateData={userData}
                    name="gender"
                    label="Gender"
                    resetForm={resetForm}
                    onChange={(option) => {
                        setFieldValue('gender', option?.value);
                    }}
                />
            </div>
            <div className="lg:col-span-6 max-sm:col-span-1 ">
                <SelectRole
                    name="role_id"
                    label="Role"
                    updateData={userData}
                    resetForm={resetForm}
                    onChange={(option) => {
                        setFieldValue('role_id', option?.value);
                    }}
                />
            </div>
            <div className="lg:col-span-6 max-sm:col-span-1 ">
                <SelectType
                    name="type"
                    updateData={userData}
                    label="type"
                    resetForm={resetForm}
                    onChange={(option) => {
                        setFieldValue('type', option?.value);
                    }}
                />
            </div>
            <div className="lg:col-span-6 max-sm:col-span-1 ">
                <SelectStatus
                    name="status"
                    updateData={userData}
                    label="status"
                    resetForm={resetForm}
                    onChange={(option) => {
                        setFieldValue('status', option?.value);
                    }}
                />
            </div>
            <div className="lg:col-span-12 max-sm:col-span-1 ">
                <label htmlFor="Bio">Bio</label>
                <Editor name="bio" />
            </div>
            <div className="lg:col-span-12 max-sm:col-span-1 ">
                <label htmlFor="avatar">Image</label>
                <UploadImage updateData={userData} name="avatar" />
            </div>

            <div className="lg:col-span-12 max-sm:col-span-1 ">
                <button type="submit" className="btn btn-primary w-full">
                    Save
                </button>
            </div>
        </div>
    );
}
