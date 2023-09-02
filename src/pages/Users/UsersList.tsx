import { useQueryClient } from '@tanstack/react-query';
import Tippy from '@tippyjs/react';
import sortBy from 'lodash/sortBy';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { EditIcon } from '../../components/atoms/icons';
import { SvgDelete } from '../../components/atoms/icons/SvgDelete';
import Loading from '../../components/atoms/loading';
import useFetch from '../../hooks/UseFetch';
import { useMutate } from '../../hooks/UseMutate';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import AddUser from './AddUser';


type AllUsers = {
    [x: string]: string;
};
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
    }
    const [idUser, setUserId] = useState<any>();



    const {
        data: Users,
        isLoading,
        isRefetching,
        isFetching,
        refetch,
    } = useFetch<AllUsers[]>({
        endpoint: `api/dashboard/user/index`,
        queryKey: [`All-Users`],
    });

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    //@ts-ignore
    const [initialRecords, setInitialRecords] = useState<any>(sortBy(Users?.data?.all_users, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [showCustomizer, setShowCustomizer] = useState(false);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    const [selectValue, setSelectValue] = useState<any>('');
    const [editData, setEditData] = useState(false);
    const [resetForm, setResetForm] = useState(true);
    const [open, setOpen] = useState(false);


    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [userData,setUserData]=useState<any>()



    useEffect(() => {
         //@ts-ignore
        setInitialRecords(sortBy(Users?.data?.all_users, 'id'))
         //@ts-ignore
    }, [Users?.data?.all_users]);

    useEffect(() => {
        //@ts-ignore

        setInitialRecords(sortBy(Users?.data?.all_users, 'id'));
        //@ts-ignore
    }, [Users?.data?.all_users]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    interface Role {
        id: number;
        role_name: string;
        // Add more properties if needed...
    }
    const { data: Roles } = useFetch<{
        data: {
            roles: Role[];
        };
    }>({
        endpoint: `api/dashboard/user/create`,
        queryKey: [`All-Roles`],
    });
    const options = Roles?.data?.roles?.map((item: any) => ({
        value: item?.id,
        label: item?.role_name,
    }));

    // filter
    useEffect(() => {
        if (selectValue !== 'Filter Role') {
            setInitialRecords(() => {
                //@ts-ignore
                return Users?.data?.all_users.filter((item: any) => {
                    return item.role_id == selectValue;
                });
            });
        } else {
            //@ts-ignore

            setInitialRecords(Users?.data?.all_users);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectValue]);

    //search
    useEffect(() => {
        setInitialRecords(() => {
            //@ts-ignore

            return Users?.data?.all_users.filter((item: any) => {
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

    const { mutate: deleteUser } = useMutate({
        mutationKey: [`users/id/${idUser}`],
        endpoint: `api/dashboard/user/delete/${idUser?.id}`,
        onSuccess: (data: any) => {
            console.log('done');
            Swal.fire({ title: 'Deleted!', text: 'User has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
            queryClient.refetchQueries(['dashboard/user/index']);
            refetch();
        },
        onError: (err: any) => {
            console.log('error', err);
            Swal.fire({ title: 'Sorry!', text: 'User can not be Deleted .', icon: 'error', customClass: 'sweet-alerts' });
        },
        method: 'delete',
        formData: false,
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
                    deleteUser(id?.id);
                }
            });
        }
    };


    const { mutate:deleteBulk  } = useMutate({
        mutationKey: ['users/id'],
        endpoint: `api/dashboard/user/bulk/delete`,
        onSuccess: (data: any) => {
            console.log('done');
            Swal.fire({ title: 'Deleted!', text: 'Users have been deleted.', icon: 'success', customClass: 'sweet-alerts' });
            queryClient.refetchQueries(['api/dashboard/user/index']);
            refetch();
            setSelectedRecords([])
        },
        onError: (err: any) => {
            Swal.fire({ title: 'Users have not be deleted!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
            console.log('error', err);
        },
        formData: true,
    });

    const showAlertDeleteSelect = async (type: number) => {
        if (type === 12) {
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
                    console.log('ddd')
                    deleteBulk({'ids[]': selectedRecords?.map((item:any) => item.id) })
                }
            });
        }
    };

    return (
        <div className="panel">
            <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 className="font-semibold text-lg dark:text-white-light">All Users</h5>
                <div className="lg:ltr:ml-auto lg:rtl:mr-auto min-md:ltr:mr-auto  min-md:rtl:ml-auto">
                    <input type="text" className="form-input w-[100%]" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                {selectedRecords.length?
                         <button
                         type="button"
                         className="bg-primary font-semibold hover:bg-blue-500 max-sm:w-[100%] max-md:w-[100%] text-white py-2 px-5 rounded-lg cursor-pointer"
                         onClick={() => {
                            showAlertDeleteSelect(12)
                         }}
                     >
                         Delete Records
                     </button>
                     :
                     null

                }

                <div>
                    <Select
                        className="lg:w-[200px] min-md:w-[200px]"
                        placeholder="Filter Role "
                        options={options}
                        onChange={(event) => {
                            setSelectValue(event?.value);
                        }}
                        isSearchable={false}
                    />
                </div>
                <div>
                    <button
                        type="button"
                        className="bg-primary font-semibold hover:bg-blue-500 max-sm:w-[100%] max-md:w-[100%] text-white py-2 px-5 rounded-lg cursor-pointer"
                        onClick={() => {
                            setOpen(true), setResetForm(true);
                        }}
                    >
                        Add User
                    </button>

                    <AddUser
                        resetForm={resetForm}
                        setOpen={setOpen}
                        open={open}
                        setResetForm={setResetForm}
                        userData={editData}
                        showCustomizer={showCustomizer}
                        setShowCustomizer={setShowCustomizer}
                    />
                </div>
            </div>
            <div className="datatables">
                {isLoading || isRefetching ? (
                    <Loading />
                ) : (
                    <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className={`${isRtl ? 'whitespace-nowrap table-hover' : 'whitespace-nowrap table-hover'}`}
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'ID', sortable: true  },
                            {
                                accessor: 'name',
                                title: 'User',
                                sortable: true,
                                width:"200px",
                                render: ({ name }:any) => (
                                    <div className="flex items-center w-max">

                                        <div>{name}</div>
                                    </div>
                                ),
                            },
                            { accessor: 'email', title:"Email" ,sortable: true },
                            { accessor: 'phone', title: 'Phone No.', sortable: true },
                            {
                                accessor: 'role',
                                title: 'Role',
                                sortable: true,
                                render: ({role_id }) => (
                                    <div className="flex items-center w-max">
                                        {role_id == 1?
                                          <div>
                                             admin
                                          </div>
                                          :
                                          <div>
                                             user
                                          </div>
                                        }
                                    </div>
                                ),
                            },
                            {
                                accessor: 'action',
                                title: 'Action',
                                titleClassName: '!text-center',
                                render: (id) => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        <Tippy >
                                            <EditIcon
                                            action={() => {
                                                setOpen(true);
                                                //@ts-ignore

                                                setEditData(id);
                                                setResetForm(false);
                                            }}
                                           />
                                        </Tippy>
                                        <Tippy >
                                        <div>
                                            <SvgDelete
                                                action={() => {
                                                    showAlert(10, id);
                                                    setUserId(id);
                                                }}
                                            />
                                        </div>
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
                )}
            </div>
        </div>
    );
};

export default UsersList;
