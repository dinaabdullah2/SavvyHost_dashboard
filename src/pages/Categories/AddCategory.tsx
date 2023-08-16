import { Drawer } from '@mantine/core';
import { right } from '@popperjs/core';
import * as Yup from 'yup';
import CategoryFormikData from './CategoryFormikData';

type CategoryCustom_TP = {
    showCustomizer?: boolean;
    setShowCustomizer?: any;
    categoryData?: any;
    setResetForm?: any;
    resetForm?: any;
    setOpen?: any;
    open?: any;
};

const AddCategory = ({  categoryData, setResetForm, resetForm, setOpen, open }: CategoryCustom_TP) => {


    const validatopnSchema = () =>
        Yup.object({
            // name: Yup.string().trim().required('faild os requerd'),
            // email: Yup.string().trim().required('sdrfgv'),
        });



    return (
        <>
            <Drawer opened={open} onClose={() => setOpen(false)} title={resetForm ? 'Add Category' : 'Edit Category'} position={right} size="40%" className="overflow-y-scroll p-5">
                <CategoryFormikData categoryData={categoryData} resetForm={resetForm}  setOpen={setOpen}/>
            </Drawer>
        </>
    );
};

export default AddCategory;


