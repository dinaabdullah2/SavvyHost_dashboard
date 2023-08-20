import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { Button } from '../../components/atoms';
import InputCustom from '../../components/atoms/InputCustom';
import { TextAreaField } from '../../components/atoms/TextAreaField';
import { useMutate } from '../../hooks/UseMutate';
import ModalCusom from '../../components/template/modal/ModalCusom';




type InitialValues_TP = {
    [x: string]: string;
};
const HeroSection = ({ mainData }: any) => {
    console.log('🚀 ~ file: HeroSection.tsx:19 ~ HeroSection ~ mainData:', mainData);
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
        hero_title: (mainData?.map((item: any) => item?.hero_title).join('') || '').replace(/,/g, ''),
        hero_body: (mainData?.map((item: any) => item?.hero_body).join('') || '').replace(/,/g, ''),
    };

    return (
        <>
            <div className="lg:col-span-12 max-sm:col-span-1 px-1 ">
                <div className="flex flex-row items-center justify-between w-[100%]  border py-3 px-2  bg-gray-100 ">
                    <h6 className=" font-bold ">Hero Section</h6>
                    <div>
                        <button onClick={open}>
                            <IconEdit className="text-blue-700" />
                        </button>
                    </div>
                </div>
            </div>
            <Modal opened={opened} size="50% " onClose={close} title="Hero Section">
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validatopnSchema}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        console.log('🚀 ~ file: pageFormikData.tsx:65 ~ PageFormikData ~ values:', values);
                        update({ ...values, page:"home_page" });
                    }}
                >
                    <Form>
                        <div className=" grid grid-cols-12 gap-2">
                            <div className="col-span-12">
                                <label htmlFor="title">title</label>
                                <InputCustom name="hero_title" label="title" />
                            </div>

                            <div className="col-span-12">
                                <label htmlFor="title">Description</label>
                                <TextAreaField name="hero_body" label="sub title" />
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

export default HeroSection;
