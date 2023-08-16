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
import { Loader } from '@mantine/core';
import Loading from '../../components/atoms/loading';
import { SvgDelete } from '../../components/atoms/icons/SvgDelete';
import AddPage from './AddPage';

const options = [
    { value: 'Filter Role', label: 'All' },
    { value: '1', label: 'admin' },
    { value: '2', label: 'user' },
];

type AllPages = {
    [x: string]: string;
};
const PagesList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Pages Table'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    interface Page {
        id: number;
        image: string;
        name: string;
        status: string;
        searchable:any;
    }
    const [idPage, setPageId] = useState<any>();

    const cols = useMemo<ColumnDef<AllPages>[]>(
        () => [
            {
                header: 'ID',
                cell: (info:any) => info.renderValue(),
                accessorKey: 'id',
            },
            {
                header: 'Page',
                cell: (info:any) => (
                    <div className=' inline-flex  items-center'>
                         <div>
                            <img className='rounded-full w-[30px] h-[30px] ' src={info?.row?.original?.logo} alt='avatar' />
                         </div>
                         <div className='ml-2  truncate '>
                           {info?.row?.original?.name }
                        </div>
                    </div>
                ),
                accessorKey: 'name',
            },

             {
                header: 'Status',
                cell: (info:any) => info.renderValue(),
                accessorKey: 'status',
            },
            {
                header: 'Searchable',
                cell: (info:any) => (
                    <div>
                      {info.row.original.searchable == 1 ? "Yes" : 'No' }
                    </div>
                ),
                accessorKey: 'searchable',
            },
            {
                header: `Action`,
                cell: (info:any) => (
                    <div className="flex gap-2">
                        <div>
                            <SvgDelete

                                action={() => {
                                    setPageId(info.row.original.id);
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
        data: Pages,
        isLoading,
        isRefetching,
        isFetching,
        refetch,
    } = useFetch<AllPages[]>({
        endpoint: `api/dashboard/page/index`,
        queryKey: [`All-Pages`],
    });

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    //@ts-ignore
    const [initialRecords, setInitialRecords] = useState<any>(sortBy(Pages?.data?.pages, 'id'));
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

        setInitialRecords(sortBy(Pages?.data?.pages, 'id'));
        //@ts-ignore
    }, [Pages?.data?.pages]);

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
    // useEffect(() => {
    //     if (selectValue !== 'Filter Role') {
    //         setInitialRecords(() => {
    //             //@ts-ignore

    //             return Users?.data?.all_users.filter((item: any) => {
    //                 return item.role_id == selectValue;
    //             });
    //         });
    //     } else {
    //         //@ts-ignore

    //         setInitialRecords(Users?.data?.all_users);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [selectValue]);

    //search
    // useEffect(() => {
    //     setInitialRecords(() => {
    //         //@ts-ignore

    //         return Users?.data?.all_users.filter((item: any) => {
    //             return item.name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase());
    //         });
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);
    const queryClient = useQueryClient();

    const { mutate: deleteUser } = useMutate({
        mutationKey: [`pages/id/${idPage}`],
        endpoint: `api/dashboard/page/delete/${idPage}`,
        onSuccess: (data: any) => {
            console.log('done');
            Swal.fire({ title: 'Deleted!', text: 'Page has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
            queryClient.refetchQueries(['dashboard/page/index']);
            refetch();
        },
        onError: (err: any) => {
            console.log('error', err);
            Swal.fire({ title: 'Sorry!', text: 'Page can not be Deleted .', icon: 'error', customClass: 'sweet-alerts' });
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
                <h5 className="font-semibold text-lg dark:text-white-light">All Pages</h5>
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
                        Add Page
                    </button>

                    <AddPage
                        resetForm={resetForm}
                        setOpen={setOpen}
                        open={open}
                        setResetForm={setResetForm}
                        pageData={editData}
                        showCustomizer={showCustomizer}
                        setShowCustomizer={setShowCustomizer}
                    />
                </div>
            </div>
            <div className="datatables">
                {isLoading || isRefetching ? (
                    <Loading />
                ) : (
                    <Table

                        columns={cols ? cols : []}
                        //@ts-ignore
                        data={Pages?.data?.pages? Pages?.data?.pages : []}
                        showNavigation
                    />
                )}
            </div>
        </div>
    );
};

export default PagesList;

