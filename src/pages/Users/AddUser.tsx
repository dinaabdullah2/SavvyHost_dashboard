import { Drawer } from '@mantine/core';
import { right } from '@popperjs/core';
import * as Yup from 'yup';
import UserFormikData from './UserFormikData';

type UserCustom_TP = {
    showCustomizer?: boolean;
    setShowCustomizer?: any;
    userData?: any;
    setResetForm?: any;
    resetForm?: any;
    setOpen?: any;
    open?: any;
};

const AddUser = ({  userData, setResetForm, resetForm, setOpen, open }: UserCustom_TP) => {


    const validatopnSchema = () =>
        Yup.object({
            // name: Yup.string().trim().required('faild os requerd'),
            // email: Yup.string().trim().required('sdrfgv'),
        });



    return (
        <>
            <Drawer opened={open} onClose={() => setOpen(false)} title={resetForm ? 'Add User' : 'Edit User'} position={right} size="40%" className="overflow-y-scroll p-5">
                <UserFormikData userData={userData} resetForm={resetForm}  setOpen={setOpen}/>
            </Drawer>
        </>
    );
};

export default AddUser;
