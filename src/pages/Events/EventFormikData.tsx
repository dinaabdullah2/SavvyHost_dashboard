import { Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { useMutate } from '../../hooks/UseMutate';
import { useQueryClient } from '@tanstack/react-query';
import EventMainData from './EventMainData';


type InitialValues_TP = {
    [x: string]: string;
};
export default function EventFormikData({ eventData, resetForm, setOpen }: any) {
    const queryClient = useQueryClient()

    const initialValues: InitialValues_TP = {
        title: !resetForm ? eventData?.title : '',
        content: !resetForm ? eventData?.content : '',
        status: !resetForm ? eventData?.status : 'publish',
        searchable: !resetForm ? eventData?.searchable : '',
        seo_title: !resetForm ? eventData?.seo_title : '',
        seo_description: !resetForm ? eventData?.seo_description : '',
        seo_image: !resetForm ? eventData?.seo_image : '',
        facebook_title: !resetForm ? eventData?.facebook_title : '',
        facebook_description: !resetForm ? eventData?.facebook_description : '',
        facebook_image: !resetForm ? eventData?.facebook_image : '',
        twitter_title: !resetForm ? eventData?.twitter_title : '',
        twitter_description: !resetForm ? eventData?.twitter_description : '',
        twitter_image: !resetForm ? eventData?.twitter_image : '',
        //@ts-ignore
        avatar: !resetForm ? eventData?.avatar : '',
        image: !resetForm ? eventData?.image : '',
        start_date:!resetForm ? eventData?.start_date : '',
        end_date:!resetForm ? eventData?.end_date : '',
        location:!resetForm ? eventData?.location : '',
        domain_ids: !resetForm ? eventData?.domain_ids : [],

    };
    // post data
    const { mutate , isLoading:postLoading } = useMutate({
        mutationKey: ['events/id'],
        endpoint: `api/dashboard/event/store`,
        onSuccess: (data: any) => {
            queryClient.refetchQueries(['All-Events']);
            Swal.fire({ title: 'Added!', text: 'Event has been added.', icon: 'success', customClass: 'sweet-alerts' });
            // setShowCustomizer(false);
            setOpen(false);
        },
        onError: (err: any) => {
            Swal.fire({ title: 'Event Can not be added!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
            console.log('error', err);
        },
        formData: true,
    });
    const { mutate: update , isLoading:loadingUpdate } = useMutate({
        mutationKey: ['events/id'],
        endpoint: `api/dashboard/event/update/${eventData?.id}`,
        onSuccess: (data: any) => {
            queryClient.refetchQueries(['All-Events']);
            Swal.fire({ title: 'Updated!', text: 'Event has been updated.', icon: 'success', customClass: 'sweet-alerts' });
            // setShowCustomizer(false);
            setOpen(false);
        },
        onError: (err: any) => {
            Swal.fire({ title: 'Event Can not be Updated!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
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
                    console.log("🚀 ~ file: eventFormikData.tsx:65 ~ EventFormikData ~ values:", values)
                    //@ts-ignore
                    resetForm ? mutate({ ...values ,domain_ids: values?.domain_ids?.map((item:any) => item.value) }) : update({ ...values,domain_ids: values?.domain_ids?.map((item:any) => item.value) , _methode: 'put' });
                    // resetForm ? mutate({ ...values }) : update({ ...values, _methode: 'put' });
                }}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <EventMainData eventData={eventData} resetForm={resetForm}  loadingUpdate={loadingUpdate} postLoading={postLoading}/>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
