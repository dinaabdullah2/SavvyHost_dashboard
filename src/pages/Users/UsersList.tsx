import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useId, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import React from 'react';
import Tippy from '@tippyjs/react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import AddUser from './AddUser';
import EditUser from './EditUser';
import useFetch from '../../hooks/UseFetch';
import axios from 'axios';
import { notifyManager, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMutate } from '../../hooks/UseMutate';
import SweetAlert from '../Components/SweetAlert';
import { Form, Formik } from 'formik';
import { BaseInputField } from '../../components/atoms/BaseInputField';

const options = [
    { value: 'Filter Role', label: 'All' },
    { value: '1', label: 'admin' },
    { value: '2', label: 'user' },
];

const UsersList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Users Table'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    interface User {
        id: number;
        image: string;
        name: string;
        username: string;
        email: string;
        phone: string;
        content: string;
        role_id: any;

        // Add more properties if needed...
    }

    const {
        data: Users,
        isLoading,
        isRefetching,
        isFetching,
        refetch,
    } = useFetch<{
        data: {
            all_users: User[];
        };
    }>({
        endpoint: `api/user/index`,
        queryKey: [`All-Users`],
    });
    console.log('🚀 ~ file: UsersList.tsx:49 ~ isFetching:', isFetching);
    console.log('🚀 ~ file: UsersList.tsx:49 ~ isRefetching:', isRefetching);
    console.log('🚀 ~ file: UsersList.tsx:49 ~ isLoading:', isLoading);
    console.log(Users?.data?.all_users);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(Users?.data?.all_users, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [showCustomizer, setShowCustomizer] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    const [selectValue, setSelectValue] = useState<any>('');
    const [userData, setUserData] = useState<any>();

    useEffect(() => {
        setInitialRecords(sortBy(Users?.data?.all_users, 'id'));
    }, [Users?.data?.all_users]);

    function OpenEditForm(id: any) {
        setShowEditForm(!showEditForm);
        setUserData(id);
        console.log(userData, 'idd');
    }

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // filter
    useEffect(() => {
        if (selectValue !== 'Filter Role') {
            setInitialRecords(() => {
                return Users?.data?.all_users.filter((item) => {
                    return item.role_id.toString().includes(selectValue.toLowerCase());
                });
            });
        } else {
            setInitialRecords(Users?.data?.all_users);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectValue]);

    //search
    useEffect(() => {
        setInitialRecords(() => {
            return Users?.data?.all_users.filter((item) => {
                return item.name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase());
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    const queryClient = useQueryClient();

    const [idUser, setUserId] = useState();
    const { mutate: deleteUser } = useMutate({
        mutationKey: [`teachers/id/{id`],
        endpoint: `api/user/delete/${idUser?.id}`,
        onSuccess: (data: any) => {
            console.log('done');
            queryClient.refetchQueries(['api/user/index']);
            refetch();
        },
        onError: (err: any) => {
            console.log('error', err);
        },
        method: 'delete',
        formData: true,
    });

    const showAlert = async (type: number, id: any) => {
        if (type === 10) {
            Swal.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                showCancelButton: true,
                confirmButtonText: 'Delete',
                padding: '2em',
                customClass: 'sweet-alerts',
            }).then((result) => {
                if (result.value) {
                    console.log(id, 'id');
                    // delete user
                    deleteUser(id);
                }
            });
        }
    };

    return (
        <div className="panel">
            <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 className="font-semibold text-lg dark:text-white-light">All Users</h5>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div>
                    <Select
                        className="w-[200px]"
                        defaultValue={options[0]}
                        options={options}
                        onChange={(event) => {
                            setSelectValue(event?.value);
                        }}
                        isSearchable={false}
                    />
                </div>
                <div>
                    <button type="button" className="bg-primary font-semibold hover:bg-blue-500 text-white py-2 px-5 rounded-lg cursor-pointer" onClick={() => setShowCustomizer(!showCustomizer)}>
                        Add User
                    </button>

                    <AddUser userData={userData} showCustomizer={showCustomizer} setShowCustomizer={setShowCustomizer} />
                    {/* <EditUser showEditForm={showEditForm} userData={userData} setShowEditForm={setShowEditForm} /> */}
                </div>
            </div>
            <div className="datatables">
                <DataTable
                    highlightOnHover
                    className={`${isRtl ? 'whitespace-nowrap table-hover' : 'whitespace-nowrap table-hover'}`}
                    records={recordsData}
                    columns={[
                        { accessor: 'id', title: 'ID', sortable: true },
                        {
                            accessor: 'name',
                            title: 'User',
                            sortable: true,
                            width: '200px',
                            render: ({ name }) => (
                                <div className="flex items-center w-max">
                                    <div>{name}</div>
                                </div>
                            ),
                        },
                        { accessor: 'email', title: 'Email', sortable: true },
                        { accessor: 'phone', title: 'Phone No.', sortable: true },
                        {
                            accessor: 'role',
                            title: 'Role',
                            sortable: true,
                            render: ({ role_id }) => <div className="flex items-center w-max">{role_id == 1 ? <div>admin</div> : <div>user</div>}</div>,
                        },
                        {
                            accessor: 'action',
                            title: 'Action',
                            titleClassName: '!text-center',
                            render: (id) => (
                                <div className="flex items-center w-max mx-auto gap-2">
                                    <Tippy>
                                        <button type="button" className="" onClick={() => {
                                            setShowCustomizer(!showCustomizer)
                                            setUserData(id)
                                        }}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-700">
                                                <path
                                                    d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                                <path
                                                    opacity="0.5"
                                                    d="M14.36 4.07812C14.36 4.07812 14.4759 6.04774 16.2138 7.78564C17.9517 9.52354 19.9213 9.6394 19.9213 9.6394M4.19789 21.6777L2.32178 19.8015"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                            </svg>
                                        </button>
                                    </Tippy>
                                    <Tippy>
                                        <button
                                            type="button"
                                            className=""
                                            onClick={() => {
                                                showAlert(10, id);
                                                setUserId(id);
                                            }}
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-600">
                                                <path
                                                    opacity="0.5"
                                                    d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                />
                                                <path d="M20.5001 6H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path
                                                    d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                />
                                                <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </Tippy>
                                </div>
                            ),
                        },
                    ]}
                    totalRecords={initialRecords.length}
                    recordsPerPage={pageSize}
                    page={page}
                    onPageChange={(p) => setPage(p)}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={setPageSize}
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                    selectedRecords={selectedRecords}
                    onSelectedRecordsChange={setSelectedRecords}
                    minHeight={200}
                    paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                />
            </div>
        </div>
    );
};

export default UsersList;
