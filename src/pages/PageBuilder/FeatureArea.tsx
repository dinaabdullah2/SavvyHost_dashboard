import { IconEdit } from '@tabler/icons-react'
import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Accordion } from '@mantine/core';
import InputCustom from '../../components/atoms/InputCustom';
import { Form, Formik } from 'formik';
import { Button } from '../../components/atoms';
import UploadImage from '../../components/atoms/UploadImage';
import { TextAreaField } from '../../components/atoms/TextAreaField';


type InitialValues_TP = {
    [x: string]: string;
};
const FeaturesArea = () => {

    const [opened, { open, close }] = useDisclosure(false);
    const initialValues: InitialValues_TP = {

    };



    const ArrOfFeartures = [
        {
          type: "text",
          id: 1,
          value: "",
        },
      ];

      const [arrFeatures, setArrFeatures] = useState(ArrOfFeartures);

      const addFeature = () => {
        setArrFeatures((s: any) => {
          return [
            ...s,
            {
              type: "text",
            },
          ];
        });
      };
      const removeFeature = (index: any) => {
        const rows = [...arrFeatures];
        rows.splice(index, 1);
        setArrFeatures(rows);
      };

   //subFeatures
   const ArrOfSubFeartures = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const [arrSubFeatures, setArrSubFeatures] = useState(ArrOfSubFeartures);




  return (
    <>

    <div className="lg:col-span-12 max-sm:col-span-1 px-1 ">
        <div className='flex flex-row items-center justify-between w-[100%]  border py-3 px-2  bg-gray-100 '>
            <h6 className=' font-bold '>Features Area</h6>
            <button onClick={open}>
                <IconEdit className='text-blue-700' />
            </button>
        </div>
    </div>
    <Modal opened={opened}  size='50% ' onClose={close} title="Features Area">
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


                    <Accordion my={'lg'} variant="separated">
                    {arrFeatures?.map((item, index) => (

                        <Accordion.Item color='gray' value={`item ${index}`} >
                            <Accordion.Control>
                                <div className='flex flex-row justify-between'>
                                    <div>
                                    Two Sub Feature   {index+1}
                                    </div>
                                <button
                                    className="text-red-600 hover:bg-red-200 px-1 rounded"
                                    disabled={arrFeatures?.length > 1 ? false : true}
                                    onClick={() => {
                                        removeFeature(index);
                                    }}
                                >
                                X
                            </button>
                            </div>
                            </Accordion.Control>
                            <Accordion.Panel>
                            <div className=''>

                                    {arrSubFeatures?.map((item, index) => (
                                    <div className='grid grid-cols-12 gap-2'>
                                        <div className='col-span-11' >
                                            <h6 className='py-3'>Sub Feature 1 </h6>
                                                <div>
                                                    <label htmlFor="title">title</label>
                                                    <InputCustom name='title' label='title' />
                                                </div>
                                                <div>
                                                    <label htmlFor="title">sub title</label>
                                                    <InputCustom name='sub_title' label='sub title'  />
                                                </div>
                                                <div>
                                                    <label htmlFor="avatar">Image</label>
                                                    <UploadImage  name="image" />
                                                </div>
                                                <h6 className='py-3'>Sub Feature 2 </h6>
                                                <div>
                                                    <label htmlFor="title">title</label>
                                                    <InputCustom name='title' label='title' />
                                                </div>
                                                <div className='col-span-12'>
                                                    <label htmlFor="title">Description</label>
                                                    <TextAreaField name='description' label='sub title'  />
                                                </div>
                                                <div>
                                                    <label htmlFor="avatar">Image</label>
                                                    <UploadImage  name="image" />
                                                </div>


                                        </div>

                                    </div>
                                ))}

                                </div>

                            </Accordion.Panel>
                        </Accordion.Item>


                    ))}
                        <button
                            className="text-white  bg-blue-600 mt-3 rounded p-1 text-xs"
                            onClick={addFeature}
                        >
                            +add Feature
                        </button>
                    </Accordion>

                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                        <Button variant="primary"  type="submit" >
                            Submit
                        </Button>
                    </div>

            </Form>
        </Formik>
    </Modal>

</>
  )
}

export default FeaturesArea
