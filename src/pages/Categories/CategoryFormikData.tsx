import { Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { useMutate } from '../../hooks/UseMutate';
import { useQueryClient } from '@tanstack/react-query';
import CategoryMainData from './CategoryMainData';

type InitialValues_TP = {
    [x: string]: string;
};
export default function CategoryFormikData({ categoryData, resetForm, setOpen }: any) {
    const queryClient = useQueryClient();

    const initialValues: InitialValues_TP = {
        name: !resetForm ? categoryData?.name : '',
        image: !resetForm ? categoryData?.image : '',
        slug: !resetForm ? categoryData?.slug : '',
    };
    // post data
    const { mutate, isLoading: postLoading } = useMutate({
        mutationKey: ['categories/id'],
        endpoint: `api/dashboard/category/store`,
        onSuccess: (data: any) => {
            queryClient.refetchQueries(['All-Categories']);
            Swal.fire({ title: 'Added!', text: 'Category has been added.', icon: 'success', customClass: 'sweet-alerts' });
            // setShowCustomizer(false);
            setOpen(false);
        },
        onError: (err: any) => {
            Swal.fire({ title: 'Category Can not be added!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
            console.log('error', err);
        },
        formData: true,
    });
    const { mutate: update, isLoading: loadingUpdate } = useMutate({
        mutationKey: ['categories/id'],
        endpoint: `api/dashboard/category/update/${categoryData?.id}`,
        onSuccess: (data: any) => {
            queryClient.refetchQueries(['All-Categories']);
            Swal.fire({ title: 'Updated!', text: 'Category has been updated.', icon: 'success', customClass: 'sweet-alerts' });
            // setShowCustomizer(false);
            setOpen(false);
        },
        onError: (err: any) => {
            Swal.fire({ title: 'Category Can not be Updated!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
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
                        <CategoryMainData 
                        categoryData={categoryData}
                        pageData={categoryData}
                         resetForm={resetForm} 
                         loadingUpdate={loadingUpdate} 
                         postLoading={postLoading} />
                    </Form>
                )}
            </Formik>
        </div>
    );
}
