import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { t } from 'i18next';
import sortBy from 'lodash/sortBy';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
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
import Tippy from '@tippyjs/react';



type AllSubscribers = {
    [x: string]: string;
};
const SubscribersList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Subscribers Table'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    interface subscriber {
        id: number;
        name: string;
        email: string;

    }
    const [idSubscriber, setSubscriberId] = useState<any>();


    const {
        data: Subscribers,
        isLoading,
        isRefetching,
        isFetching,
        refetch,
    } = useFetch<AllSubscribers[]>({
        endpoint: `api/dashboard/subscriber/index`,
        queryKey: [`All-Subscribers`],
    });

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    //@ts-ignore
    const [initialRecords, setInitialRecords] = useState<any>(sortBy(Subscribers?.data?.subscribers, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [showCustomizer, setShowCustomizer] = useState(false);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    const [selectValue, setSelectValue] = useState<any>('');
    const [editData, setEditData] = useState(false);
    const [resetForm, setResetForm] = useState(true);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        //@ts-ignore

        setInitialRecords(sortBy(Subscribers?.data?.subscribers, 'id'));
        console.log(selectedRecords,'select')
        //@ts-ignore
    }, [Subscribers?.data?.subscribers]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);



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


    // search
    useEffect(() => {
        setInitialRecords(() => {
            //@ts-ignore

            return Subscribers?.data?.subscribers.filter((item: any) => {
                return item?.name?.toLowerCase().includes(search.toLowerCase()) || item?.email?.toLowerCase().includes(search.toLowerCase())
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        console.log(selectedRecords,'select')
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);
    const queryClient = useQueryClient();

    const { mutate: deleteSubscriber } = useMutate({
        mutationKey: [`subscriber/id/${idSubscriber}`],
        endpoint: `api/dashboard/subscriber/delete/${idSubscriber?.id}`,
        onSuccess: (data: any) => {
            console.log('done');
            Swal.fire({ title: 'Deleted!', text: 'Subscriber has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
            queryClient.refetchQueries(['api/dashboard/subscriber/index']);
            refetch();
        },
        onError: (err: any) => {
            console.log('error', err);
            Swal.fire({ title: 'Sorry!', text: 'Subscriber can not be Deleted .', icon: 'error', customClass: 'sweet-alerts' });
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
                    deleteSubscriber(id?.id);
                }
            });
        }
    };

    const { mutate:deleteBulk , isLoading:postLoading } = useMutate({
        mutationKey: ['subscriber/id'],
        endpoint: `api/dashboard/subscriber/bulk/delete`,
        onSuccess: (data: any) => {
            console.log('done');
            Swal.fire({ title: 'Deleted!', text: 'Subscribers have been deleted.', icon: 'success', customClass: 'sweet-alerts' });
            queryClient.refetchQueries(['api/dashboard/subscriber/index']);
            refetch();
            setSelectedRecords([])
        },
        onError: (err: any) => {
            Swal.fire({ title: 'Subscribers have not be deleted!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
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
                <h5 className="font-semibold text-lg dark:text-white-light">All Subscrbers</h5>
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
                            { accessor: 'id', title: 'ID', sortable: true , width:"80px"},
                            { accessor: 'email',
                            title: 'Email',
                            sortable: true,
                            },
                            {
                                accessor: 'name',
                                title: 'Name',
                                sortable: true,

                            },
                            {
                                    accessor: 'action',
                                    title: 'Action',
                                    titleClassName: '!text-center',
                                    render: (id) => (
                                        <div className="flex items-center w-max mx-auto gap-2">

                                            <Tippy >
                                            <div>
                                                <SvgDelete
                                                    action={() => {
                                                        setSubscriberId(id);
                                                        showAlert(10, id);
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

export default SubscribersList;
