import React, { useState } from 'react'
import { Accordion, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { Form, Formik } from 'formik';
import { Button } from '../../components/atoms';
import InputCustom from '../../components/atoms/InputCustom';
import { TextAreaField } from '../../components/atoms/TextAreaField';
import { useMutate } from '../../hooks/UseMutate';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import ModalCusom from '../../components/template/modal/ModalCusom';




const YearsSection = () => {


    const [opened, { open, close }] = useDisclosure(false);



    const ArrOfYears = [
        {
          type: "text",
          id: 1,
          value: "",
        },
      ];

      const [arrYears, setArrYears] = useState(ArrOfYears);

      const addYear = () => {
        setArrYears((s: any) => {
          return [
            ...s,
            {
              type: "text",
            },
          ];
        });
      };
      const removeYear = (index: any) => {
        const rows = [...arrYears];
        rows.splice(index, 1);
        setArrYears(rows);
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


  const addSubFeature = () => {
    setArrSubFeatures((s: any) => {
      return [
        ...s,
        {
          type: "text",
        },
      ];
    });
  };
  const removeSubFeature = (index: any) => {
    const rows = [...arrSubFeatures];
    rows.splice(index, 1);
    setArrSubFeatures(rows);
  };


    const queryClient = useQueryClient();

    // post data
    const { mutate:update, isLoading: postLoading } = useMutate({
        mutationKey: ['api/dashboard/part/update'],
        endpoint: `api/dashboard/part/update`,
        onSuccess: (data: any) => {
            queryClient.refetchQueries(['All-Events']);
            Swal.fire({ title: 'Added!', text: 'Event has been added.', icon: 'success', customClass: 'sweet-alerts' });
            // setShowCustomizer(false);
        },
        onError: (err: any) => {
            Swal.fire({ title: 'Event Can not be added!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
            console.log('error', err);
        },
        formData: true,
    });

    const initialValues = {
        // About_title: (mainData?.map((item: any) => item?.About_title).join('') || '').replace(/,/g, ''),
        // About_body:(mainData?.map((item: any) => item?.About_body).join('') || '').replace(/,/g, ''),
    };




  return (
    <>

    <div className="lg:col-span-12 max-sm:col-span-1 px-1 ">
        <div className='flex flex-row items-center justify-between w-[100%]  border py-3 px-2  bg-gray-100 '>
            <h6 className=' font-bold '>Years section</h6>
            <button onClick={open}>
                <IconEdit className='text-blue-700' />
            </button>
        </div>
    </div>
    <ModalCusom opened={opened}  onClose={close} title="Years section">
       <Formik
            initialValues={initialValues}
            // validationSchema={validatopnSchema}
            enableReinitialize={true}
            onSubmit={(values) => {
            console.log("🚀 ~ file: pageFormikData.tsx:65 ~ PageFormikData ~ values:", values)
                     update({ ...values , page:"About_page" });
            }}
            >
            <Form>
                <div className=' grid grid-cols-12 gap-2'>
                {arrYears?.map((item, index) => (
                    <>
                        <div className='col-span-11'>
                            <label htmlFor="year">Year {index+1}</label>
                            <InputCustom name='year' label='year' />
                        </div>


                  </>
                ))}
                  <div className="col-span-12 ">
                        <button
                            className="text-white  bg-blue-600 mt-3 rounded p-1 text-xs"
                            onClick={addYear}
                            >
                                +add Feature
                            </button>
                        </div>
                    <div className='col-span-12'>
                       <label htmlFor="title">Description</label>
                       <TextAreaField name='About_body' label='sub title'  />
                    </div>
                    <div className="col-span-12  ">
                        <Button variant="primary" type="submit" >
                            submit
                        </Button>
                    </div>
                </div>


            </Form>
        </Formik>
    </ModalCusom>

</>
  )
}

export default YearsSection
