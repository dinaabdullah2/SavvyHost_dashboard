import { Drawer } from '@mantine/core';
import { right } from '@popperjs/core';
import * as Yup from 'yup';
import EventFormikData from './EventFormikData';


type EventCustom_TP = {
    showCustomizer?: boolean;
    setShowCustomizer?: any;
    eventData?: any;
    setResetForm?: any;
    resetForm?: any;
    setOpen?: any;
    open?: any;
};

const AddEvent = ({  eventData, setResetForm, resetForm, setOpen, open }: EventCustom_TP) => {


    const validatopnSchema = () =>
        Yup.object({
            // name: Yup.string().trim().required('faild os requerd'),
            // email: Yup.string().trim().required('sdrfgv'),
        });



    return (
        <>
            <Drawer opened={open} onClose={() => setOpen(false)} title={resetForm ? 'Add Event' : 'Edit Event'} position={right} size="40%" className="overflow-y-scroll p-5">
                <EventFormikData eventData={eventData} resetForm={resetForm}  setOpen={setOpen}/>
            </Drawer>
        </>
    );
};

export default AddEvent;
