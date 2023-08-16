import { Drawer } from '@mantine/core';
import { right } from '@popperjs/core';
import * as Yup from 'yup';
import BlogFormikData from './BlogFormikData';

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


    const validatopnSchema = () =>
        Yup.object({
            // name: Yup.string().trim().required('faild os requerd'),
            // email: Yup.string().trim().required('sdrfgv'),
        });



    return (
        <>
            <Drawer opened={open} onClose={() => setOpen(false)} title={resetForm ? 'Add Blog' : 'Edit Blog'} position={right} size="40%" className="overflow-y-scroll p-5">
                <BlogFormikData blogData={blogData} resetForm={resetForm}  setOpen={setOpen}/>
            </Drawer>
        </>
    );
};

export default AddBlog;
