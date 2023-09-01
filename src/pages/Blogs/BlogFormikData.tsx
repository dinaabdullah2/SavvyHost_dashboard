import { Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { useMutate } from '../../hooks/UseMutate';
import { useQueryClient } from '@tanstack/react-query';
import BlogMainData from './BlogMainData';

type InitialValues_TP = {
    [x: string]: string;
};
export default function BlogFormikData({ blogData, resetForm, setOpen }: any) {
    const queryClient = useQueryClient();

    const initialValues: InitialValues_TP = {
        title: !resetForm ? blogData?.title : '',
        content: !resetForm ? blogData?.content : '',
        status: !resetForm ? blogData?.status : 'publish',
        searchable: !resetForm ? blogData?.searchable : 1,
        seo_title: !resetForm ? blogData?.seo_title : '',
        seo_description: !resetForm ? blogData?.seo_description : '',
        seo_image: !resetForm ? blogData?.seo_image : '',
        facebook_title: !resetForm ? blogData?.facebook_title : '',
        facebook_description: !resetForm ? blogData?.facebook_description : '',
        facebook_image: !resetForm ? blogData?.facebook_image : '',
        twitter_title: !resetForm ? blogData?.twitter_title : '',
        twitter_description: !resetForm ? blogData?.twitter_description : '',
        twitter_image: !resetForm ? blogData?.twitter_image : '',
        //@ts-ignore
        image: !resetForm ? blogData?.image : '',
        tags: !resetForm ? blogData?.tags : [],
        category_id: !resetForm ? blogData?.category_id : '',
        user_id: !resetForm ? blogData?.user_id : '',
    };
    // post data
    const { mutate, isLoading: postLoading } = useMutate({
        mutationKey: ['blogs/id'],
        endpoint: `api/dashboard/blog/store`,
        onSuccess: (data: any) => {
            queryClient.refetchQueries(['All-Blogs']);
            Swal.fire({ title: 'Added!', text: 'Blog has been added.', icon: 'success', customClass: 'sweet-alerts' });
            // setShowCustomizer(false);
            setOpen(false);
        },
        onError: (err: any) => {
            Swal.fire({ title: 'Blog Can not be added!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
            console.log('error', err);
        },
        formData: true,
    });
    const { mutate: update, isLoading: loadingUpdate } = useMutate({
        mutationKey: ['blogs/id'],
        endpoint: `api/dashboard/blog/${blogData?.id}`,
        onSuccess: (data: any) => {
            queryClient.refetchQueries(['All-Blogs']);
            Swal.fire({ title: 'Updated!', text: 'Blog has been updated.', icon: 'success', customClass: 'sweet-alerts' });
            // setShowCustomizer(false);
            setOpen(false);
        },
        onError: (err: any) => {
            Swal.fire({ title: 'Blog Can not be Updated!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
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
                    //@ts-ignore
                    resetForm ? mutate({ ...values, tags: values?.tags?.map((item:any) => item.value) }) : update({ ...values , tags: values?.tags?.map((item:any) => item.value), _methode: 'put' });
                }}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <BlogMainData blogData={blogData} resetForm={resetForm} loadingUpdate={loadingUpdate} postLoading={postLoading} />
                    </Form>
                )}
            </Formik>
        </div>
    );
}
