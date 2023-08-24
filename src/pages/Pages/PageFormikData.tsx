import { Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { useMutate } from '../../hooks/UseMutate';
import { useQueryClient } from '@tanstack/react-query';
import PageMainData from './PageMainData';

type InitialValues_TP = {
    [x: string]: string;
};
export default function PageFormikData({ pageData, resetForm, setOpen }: any) {
    const queryClient = useQueryClient()

    const initialValues: InitialValues_TP = {
        name: !resetForm ? pageData?.name : '',
        content: !resetForm ? pageData?.content : '',
        status: !resetForm ? pageData?.status : 'publish',
        searchable: !resetForm ? pageData?.searchable : 1,
        seo_title: !resetForm ? pageData?.seo_title : '',
        seo_description: !resetForm ? pageData?.seo_description : '',
        seo_image: !resetForm ? pageData?.seo_image : '',
        facebook_title: !resetForm ? pageData?.facebook_title : '',
        facebook_description: !resetForm ? pageData?.facebook_description : '',
        facebook_image: !resetForm ? pageData?.facebook_image : '',
        twitter_title: !resetForm ? pageData?.twitter_title : '',
        twitter_description: !resetForm ? pageData?.twitter_description : '',
        twitter_image: !resetForm ? pageData?.twitter_image : '',
        //@ts-ignore
        featured_image: !resetForm ? pageData?.featured_image : '',
    };
    // post data
    const { mutate , isLoading:postLoading } = useMutate({
        mutationKey: ['pages/id'],
        endpoint: `api/dashboard/page/store`,
        onSuccess: (data: any) => {
            queryClient.refetchQueries(['All-Pages']);
            Swal.fire({ title: 'Added!', text: 'Page has been added.', icon: 'success', customClass: 'sweet-alerts' });
            // setShowCustomizer(false);
            setOpen(false);
        },
        onError: (err: any) => {
            Swal.fire({ title: 'Page Can not be added!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
            console.log('error', err);
        },
        formData: true,
    });
    const { mutate: update , isLoading:loadingUpdate } = useMutate({
        mutationKey: ['pages/id'],
        endpoint: `api/dashboard/page/update/${pageData?.id}`,
        onSuccess: (data: any) => {
            queryClient.refetchQueries(['All-Pages']);
            Swal.fire({ title: 'Updated!', text: 'Page has been updated.', icon: 'success', customClass: 'sweet-alerts' });
            // setShowCustomizer(false);
            setOpen(false);
        },
        onError: (err: any) => {
            Swal.fire({ title: 'Page Can not be Updated!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
        },
        formData: true,
    });

    return (
        <div>
            <Formik
                initialValues={initialValues}
                // validationSchema={validatopnSchema}
                enableReinitialize={true}
                onSubmit={(values) => {
                    resetForm ? mutate({ ...values }) : update({ ...values, _methode: 'put' });
                }}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <PageMainData pageData={pageData} resetForm={resetForm}  loadingUpdate={loadingUpdate} postLoading={postLoading}/>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
