import { Drawer } from '@mantine/core';
import { right } from '@popperjs/core';
import * as Yup from 'yup';
import UserFormikData from './UserFormikData';
import { useEffect, useState } from 'react';

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


    const [windowSize, setWindowSize] = useState<number | any>();

    useEffect(() => {
      function handleResize() {
        setWindowSize(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const validatopnSchema = () =>
        Yup.object({
            // name: Yup.string().trim().required('faild os requerd'),
            // email: Yup.string().trim().required('sdrfgv'),
        });



    return (
        <>
            <Drawer opened={open} onClose={() => setOpen(false)} title={resetForm ? 'Add User' : 'Edit User'} position={right} size={windowSize >= 900? '40%':windowSize >= 600?  '70%' :'95%'} className="overflow-y-scroll p-5">
                <UserFormikData userData={userData} resetForm={resetForm}  setOpen={setOpen}/>
            </Drawer>
        </>
    );
};

export default AddUser;
