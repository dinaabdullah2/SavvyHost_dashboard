import { Drawer } from '@mantine/core';
import { right } from '@popperjs/core';
import * as Yup from 'yup';
import PageFormikData from './PageFormikData';
import { useEffect, useState } from 'react';

type PageCustom_TP = {
    showCustomizer?: boolean;
    setShowCustomizer?: any;
    pageData?: any;
    setResetForm?: any;
    resetForm?: any;
    setOpen?: any;
    open?: any;
};

const AddPage = ({  pageData, setResetForm, resetForm, setOpen, open }: PageCustom_TP) => {

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
            <Drawer opened={open} onClose={() => setOpen(false)} title={resetForm ? 'Add Page' : 'Edit Page'} position={right}  size={windowSize >= 900? '40%':windowSize >= 600?  '70%' :'95%'} className="overflow-y-scroll p-5">
                <PageFormikData pageData={pageData} resetForm={resetForm}  setOpen={setOpen}/>
            </Drawer>
        </>
    );
};

export default AddPage;
