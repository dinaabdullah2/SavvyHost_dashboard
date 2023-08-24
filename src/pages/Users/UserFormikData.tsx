import { Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { useMutate } from '../../hooks/UseMutate';
import UserMainData from './UserMainData';
import { useQueryClient } from '@tanstack/react-query';

type InitialValues_TP = {
    [x: string]: string;
};
export default function UserFormikData({ userData, resetForm, setOpen }: any) {
    const queryClient = useQueryClient()

    const initialValues: InitialValues_TP = {
        name: !resetForm ? userData?.name : '',
        username: !resetForm ? userData?.username : '',
        avatar: !resetForm ? userData?.avatar : '',
        status: !resetForm ? userData?.status : '',
        email: !resetForm ? userData?.email : '',
        phone: !resetForm ? userData?.phone : '',
        password: !resetForm ? userData?.password : '',
        //@ts-ignore
        gender: !resetForm ? userData?.gender ==="Male" ? 1 : 0 : '',
        country_id: !resetForm ? userData?.country?.id : '',
        bio: !resetForm ? userData?.bio : '',
        type: !resetForm ? userData?.type : '',
        role_id: !resetForm ? userData?.role_id : '',
    };
    // post data
    const { mutate , isLoading:postLoading } = useMutate({
        mutationKey: ['users/id'],
        endpoint: `api/dashboard/user/store`,
        onSuccess: (data: any) => {
            queryClient.refetchQueries(['All-Users']);
            Swal.fire({ title: 'Added!', text: 'User has been added.', icon: 'success', customClass: 'sweet-alerts' });
            // setShowCustomizer(false);
            setOpen(false);
        },
        onError: (err: any) => {
            Swal.fire({ title: 'User Can not be added!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
            console.log('error', err);
        },
        formData: true,
    });
    const { mutate: update , isLoading:loadingUpdate } = useMutate({
        mutationKey: ['users/id'],
        endpoint: `api/dashboard/user/update/${userData?.id}`,
        onSuccess: (data: any) => {
            queryClient.refetchQueries(['All-Users']);
            Swal.fire({ title: 'Updated!', text: 'User has been updated.', icon: 'success', customClass: 'sweet-alerts' });
            // setShowCustomizer(false);
            setOpen(false);
        },
        onError: (err: any) => {
            Swal.fire({ title: 'User Can not be Updated!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
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
                        <UserMainData userData={userData} resetForm={resetForm}  loadingUpdate={loadingUpdate} postLoading={postLoading}/>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
