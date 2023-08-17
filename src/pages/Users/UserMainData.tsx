import React from 'react';
import InputCustom from '../../components/atoms/InputCustom';
import PhoneInput2 from '../../components/atoms/PhoneInput';
import SelectGender from '../../components/atoms/SelectGender';
import SelectRole from '../../components/atoms/SelectRole';
import SelectType from '../../components/atoms/SelectType';
import SelectStatus from '../../components/atoms/SelectStatus';
import Editor from '../../components/atoms/Editor';
import SelectCountries from '../../components/atoms/SelectCountries';
import { useFormikContext } from 'formik';
import { Button } from '../../components/atoms';
import UploadImg from '../../components/molecules/UploadImg';
import UploadImage from '../../components/atoms/UploadImage';

export default function UserMainData({ userData, resetForm, loadingUpdate, postLoading }: any) {
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
                <label htmlFor="country"> Country</label>
                <SelectCountries
                    updateData={userData}
                    CountryName="country_id"
                    resetForm={resetForm}
                    onChange={(option) => {
                        setFieldValue('country_id', option?.value);
                    }}
                />
            </div>
            <div className="lg:col-span-6 max-sm:col-span-1 ">
                <label htmlFor="gender">Gender</label>
                <SelectGender
                    updateData={userData}
                    name="gender"
                    resetForm={resetForm}
                    onChange={(option) => {
                        console.log('🚀 ~ file: UserMainData.tsx:55 ~ UserMainData ~ option:', option);
                        setFieldValue('gender', option?.value);
                    }}
                />
            </div>
            <div className="lg:col-span-6 max-sm:col-span-1 ">
                <label htmlFor="role">Role</label>
                <SelectRole
                    name="role_id"
                    updateData={userData}
                    resetForm={resetForm}
                    onChange={(option) => {
                        setFieldValue('role_id', option?.value);
                    }}
                />
            </div>
            <div className="lg:col-span-6 max-sm:col-span-1 ">
                <label htmlFor="type">Type</label>
                <SelectType
                    name="type"
                    updateData={userData}
                    resetForm={resetForm}
                    onChange={(option) => {
                        setFieldValue('type', option?.value);
                    }}
                />
            </div>
            <div className="lg:col-span-6 max-sm:col-span-1 ">
                <label htmlFor="status">Status</label>
                <SelectStatus
                    name="status"
                    updateData={userData}
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
                {/* <UploadImg name="avatar" /> */}
            </div>

            <div className="lg:col-span-12 max-sm:col-span-1 ">
                <Button variant="primary" type="submit" loading={loadingUpdate || postLoading}>
                    submit
                </Button>
            </div>
        </div>
    );
}
