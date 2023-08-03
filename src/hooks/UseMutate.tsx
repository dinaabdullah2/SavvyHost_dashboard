import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

type useMutateProps_TP<response_T> = {
    endpoint: string;
    mutationKey: [string];
    onSuccess?: (data: response_T) => void;
    onError?: (err: unknown) => void;
    formData?: boolean;
    useCompanyToken?: boolean;
    onMutate?: (err?: unknown) => void;
    method?: 'post' | 'delete'; // Add the method property
};

export function useMutate<response_T>({ endpoint, mutationKey, onError, onSuccess, formData, useCompanyToken, onMutate,   method = "post", }: useMutateProps_TP<response_T>) {
    const user_token = Cookies.get('token');
    const token = user_token;
    const authorizationHeader = `Bearer ${token}`;

    const { data, isLoading, isSuccess, mutate, failureReason, isError } = useMutation({
        mutationKey,
        mutationFn: (values) => {
            return axios({
                method: method.toUpperCase(), // Use the specified method
                url: `https://dashboard.savvyhost.io/${endpoint}`,
                data: method === 'delete'? '' :  values,
                headers: formData
                ? {

                    "Content-Type": "multipart/form-data",
                      Authorization: authorizationHeader,
                  }
                : {
                      'Content-Type': 'application/json; charset=utf-8',
                      Authorization: authorizationHeader,
                  },
            });
        },
        onSuccess,
        onError,
        onMutate,
    });
    return { data, isLoading, isSuccess, mutate, failureReason, isError };
}
