import { Accordion, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { Form, Formik } from 'formik';
import { Button } from '../../components/atoms';
import React from 'react';
import InputCustom from '../../components/atoms/InputCustom';
import { TextAreaField } from '../../components/atoms/TextAreaField';
import { useMutate } from '../../hooks/UseMutate';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import ModalCusom from '../../components/template/modal/ModalCusom';



type InitialValues_TP = {
    [x: string]: string;
};
const Newsletter = ({ mainData }: any) => {
    const [opened, { open, close }] = useDisclosure(false);
    const queryClient = useQueryClient();

    // post data
    const { mutate: update, isLoading: postLoading } = useMutate({
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
        News_title: (mainData?.map((item: any) => item?.News_title).join('') || '').replace(/,/g, ''),
        News_body: (mainData?.map((item: any) => item?.News_body).join('') || '').replace(/,/g, ''),
        News_sup_title: (mainData?.map((item: any) => item?.News_sup_title).join('') || '').replace(/,/g, ''),
    };
    return (
        <>
            <div className="lg:col-span-12 max-sm:col-span-1 px-1 ">
                <div className="flex flex-row items-center justify-between w-[100%]  border py-3 px-2  bg-gray-100 ">
                    <h6 className=" font-bold ">Newsletter Section</h6>
                    <button onClick={open}>
                        <IconEdit className="text-blue-700" />
                    </button>
                </div>
            </div>
            <Modal opened={opened} size="50% " onClose={close} title="Newsletter Section">
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validatopnSchema}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        console.log('🚀 ~ file: pageFormikData.tsx:65 ~ PageFormikData ~ values:', values);
                        update({ ...values, page: 'News_page' });
                    }}
                >
                    <Form>
                        <div className=" grid grid-cols-12 gap-2">
                            <div className="col-span-12">
                                <label htmlFor="title">title</label>
                                <InputCustom name="News_title" label="title" />
                            </div>
                            <div className="col-span-12">
                                <label htmlFor="title">Sub title</label>
                                <TextAreaField name="News_sup_title" label="sub title" />
                            </div>

                            <div className="col-span-12">
                                <label htmlFor="title">Description</label>
                                <TextAreaField name="News_body" label="sub title" />
                            </div>
                            <div className="lg:col-span-12 max-sm:col-span-1 ">
                                <Button variant="primary" type="submit" loading={postLoading}>
                                    submit
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </Modal>
        </>
    );
};

export default Newsletter;
