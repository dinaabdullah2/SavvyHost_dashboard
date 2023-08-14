import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { t } from 'i18next';
import sortBy from 'lodash/sortBy';
import { DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import { GiCancel } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { EditIcon } from '../../components/atoms/icons';
import { Table } from '../../components/template/tantable/Table';
import useFetch from '../../hooks/UseFetch';
import { useMutate } from '../../hooks/UseMutate';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import AddUser from './AddUser';

const options = [
    { value: 'Filter Role', label: 'All' },
    { value: '1', label: 'admin' },
    { value: '2', label: 'user' },
];

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

    const cols = useMemo<ColumnDef<AllUsers>[]>(
        () => [
            {
                header: 'ID',
                cell: (info) => info.renderValue(),
                accessorKey: 'id',
            },
            {
                header: 'name',
                cell: (info) => info.renderValue(),
                accessorKey: 'name',
            },
            {
                header: 'type',
                cell: (info) => info.renderValue(),
                accessorKey: 'type',
            },
            {
                header: 'status',
                cell: (info) => info.renderValue(),
                accessorKey: 'status',
            },
            {
                header: 'phone',
                cell: (info) => info.renderValue(),
                accessorKey: 'phone',
            },
            {
                header: 'email',
                cell: (info) => info.renderValue(),
                accessorKey: 'email',
            },
            {
                header: `${t('action')}`,
                cell: (info) => (
                    <div className="flex justify-center gap-2">
                        <div>
                            <GiCancel
                                className="!w-[20px] !h-[20px] m-auto cursor-pointer text-red-700"
                                onClick={() => {
                                    setUserId(info.row.original.id);
                                    showAlert(10, info.row.original.id);
                                }}
                            />
                        </div>
                        <div>
                            <EditIcon
                                action={() => {
                                    setOpen(true);
                                    //@ts-ignore

                                    setEditData(info.row.original);
                                    setResetForm(false);
                                }}
                            />
                        </div>
                    </div>
                ),

                accessorKey: 'join',
            },
        ],
        []
    );

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
        endpoint: `api/dashboard/user/delete/${idUser}`,
        onSuccess: (data: any) => {
            console.log('done');
            Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
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

    return (
        <div className="panel">
            <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 className="font-semibold text-lg dark:text-white-light">All Users</h5>
                <div className="lg:ltr:ml-auto lg:rtl:mr-auto min-md:ltr:mr-auto  min-md:rtl:ml-auto">
                    <input type="text" className="form-input w-[100%]" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

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
                <Table
                    columns={cols ? cols : []}
                    //@ts-ignore

                    data={Users?.data?.all_users ? Users?.data?.all_users : []}
                    showNavigation
                />
            </div>
        </div>
    );
};

export default UsersList;
