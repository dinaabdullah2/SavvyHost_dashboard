import { Drawer } from '@mantine/core';
import { right } from '@popperjs/core';
import * as Yup from 'yup';
import PageFormikData from './PageFormikData';

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


    const validatopnSchema = () =>
        Yup.object({
            // name: Yup.string().trim().required('faild os requerd'),
            // email: Yup.string().trim().required('sdrfgv'),
        });



    return (
        <>
            <Drawer opened={open} onClose={() => setOpen(false)} title={resetForm ? 'Add Page' : 'Edit Page'} position={right} size="40%" className="overflow-y-scroll p-5">
                <PageFormikData pageData={pageData} resetForm={resetForm}  setOpen={setOpen}/>
            </Drawer>
        </>
    );
};

export default AddPage;
