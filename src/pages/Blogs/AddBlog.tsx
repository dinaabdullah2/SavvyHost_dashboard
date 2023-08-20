import { Drawer } from '@mantine/core';
import { right } from '@popperjs/core';
import * as Yup from 'yup';
import BlogFormikData from './BlogFormikData';
import { useEffect, useState } from 'react';

type BlogCustom_TP = {
    showCustomizer?: boolean;
    setShowCustomizer?: any;
    blogData?: any;
    setResetForm?: any;
    resetForm?: any;
    setOpen?: any;
    open?: any;
};

const AddBlog = ({  blogData, setResetForm, resetForm, setOpen, open }: BlogCustom_TP) => {


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
            <Drawer opened={open} onClose={() => setOpen(false)} title={resetForm ? 'Add Blog' : 'Edit Blog'} position={right} size={windowSize >= 900? '40%':windowSize >= 600?  '70%' :'95%'} className="overflow-y-scroll p-5">
                <BlogFormikData blogData={blogData} resetForm={resetForm}  setOpen={setOpen}/>
            </Drawer>
        </>
    );
};

export default AddBlog;
