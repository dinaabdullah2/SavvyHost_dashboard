import { IconEdit } from '@tabler/icons-react'
import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Accordion } from '@mantine/core';
import InputCustom from '../../components/atoms/InputCustom';
import { Form, Formik } from 'formik';
import { Button } from '../../components/atoms';
import UploadImage from '../../components/atoms/UploadImage';
import { TextAreaField } from '../../components/atoms/TextAreaField';
import ModalCusom from '../../components/template/modal/ModalCusom';

type InitialValues_TP = {
    [x: string]: string;
};
const AboutUsCareers = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const initialValues: InitialValues_TP = {

    };
  return (
    <>

    <div className="lg:col-span-12 max-sm:col-span-1 px-1 ">
        <div className='flex flex-row items-center justify-between w-[100%]  border py-3 px-2  bg-gray-100 '>
            <h6 className=' font-bold '>Career Section</h6>
            <button onClick={open}>
                <IconEdit className='text-blue-700' />
            </button>
        </div>
    </div>

    <ModalCusom opened={opened}  onClose={close} title="Career Section">
       <Formik
            initialValues={initialValues}
            // validationSchema={validatopnSchema}
            enableReinitialize={true}
            onSubmit={(values) => {
            console.log("🚀 ~ file: pageFormikData.tsx:65 ~ PageFormikData ~ values:", values)
                // resetForm ? mutate({ ...values }) : update({ ...values, _methode: 'put' });
            }}
            >
            <Form>
                <div className='grid grid-cols-12 gap-2'>
                     <div className='col-span-12'>
        

                            <label htmlFor="title">title</label>
                            <InputCustom name='title' label='title' />
                        </div>
                        <div className='col-span-12'>
                            <label htmlFor="title">Description</label>
                            <TextAreaField name='description' label='sub title'  />
                        </div>
                        <div className='col-span-12'>
                            <label htmlFor="avatar">Image Career</label>
                            <UploadImage  name="image" />
                        </div>


                    </div>
                    <div className="col-span-12">
                        <Button variant="primary"  type="submit" >
                            Submit
                        </Button>
                    </div>
            </Form>
        </Formik>
    </ModalCusom>

</>
  )
}

export default AboutUsCareers
