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
import AddEvent from './AddEvent';
import Tippy from '@tippyjs/react';


type AllEvents = {
    [x: string]: string;
};
const EventsList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Events Table'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    interface Event {
        id: number;
        image: string;
        title: string;
        status: string;
        searchable:any;
        location:any;
        start_date:any;
        end_date:any;
    }
    const [idEvent, setEventId] = useState<any>();


    const {
        data: Events,
        isLoading,
        isRefetching,
        isFetching,
        refetch,
    } = useFetch<AllEvents[]>({
        endpoint: `api/dashboard/event/index`,
        queryKey: [`All-Events`],
    });

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    //@ts-ignore
    const [initialRecords, setInitialRecords] = useState<any>(sortBy(Events?.data?.events, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [showCustomizer, setShowCustomizer] = useState(false);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    const [selectValue, setSelectValue] = useState<any>('');
    const [editData, setEditData] = useState(false);
    const [resetForm, setResetForm] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    useEffect(() => {
        //@ts-ignore

        setInitialRecords(sortBy(Events?.data?.events, 'id'));
        //@ts-ignore
    }, [Events?.data?.events]);

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

    //search
    useEffect(() => {
        setInitialRecords(() => {
            //@ts-ignore

            return Events?.data?.events.filter((item: any) => {
                return item.title.toLowerCase().includes(search.toLowerCase()) || item.location.toLowerCase().includes(search.toLowerCase());
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

    const { mutate: deleteEvent } = useMutate({
        mutationKey: [`events/id/${idEvent}`],
        endpoint: `api/dashboard/event/delete/${idEvent?.id}`,
        onSuccess: (data: any) => {
            console.log('done');
            Swal.fire({ title: 'Deleted!', text: 'Event has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
            queryClient.refetchQueries(['api/dashboard/event/index']);
            refetch();
        },
        onError: (err: any) => {
            console.log('error', err);
            Swal.fire({ title: 'Sorry!', text: 'Event can not be Deleted .', icon: 'error', customClass: 'sweet-alerts' });
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
                    deleteEvent(id?.id);
                }
            });
        }
    };


    const { mutate:deleteBulk  } = useMutate({
        mutationKey: ['events/id'],
        endpoint: `api/dashboard/event/bulk/delete`,
        onSuccess: (data: any) => {
            console.log('done');
            Swal.fire({ title: 'Deleted!', text: 'Events have been deleted.', icon: 'success', customClass: 'sweet-alerts' });
            queryClient.refetchQueries(['api/dashboard/event/index']);
            refetch();
            setSelectedRecords([])
        },
        onError: (err: any) => {
            Swal.fire({ title: 'Events have not be deleted!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
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
                <h5 className="font-semibold text-lg dark:text-white-light">All Events</h5>
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
                    <button
                        type="button"
                        className="bg-primary font-semibold hover:bg-blue-500 max-sm:w-[100%] max-md:w-[100%] text-white py-2 px-5 rounded-lg cursor-pointer"
                        onClick={() => {
                            setOpen(true), setResetForm(true);
                        }}
                    >
                        Add Event
                    </button>

                    <AddEvent
                        resetForm={resetForm}
                        setOpen={setOpen}
                        open={open}
                        setResetForm={setResetForm}
                        eventData={editData}
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
                            { accessor: 'id', title: 'ID', sortable: true,width:"71px"  },
                            {
                                accessor: 'title',
                                title: 'Title',
                                width:"200px",
                                sortable: true,
                                render: ({ title, image }:any) => (
                                    <div className="flex items-center ">
                                        <img className="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 object-cover" src={image} alt="" />
                                        <div className='truncate'>{title}</div>
                                    </div>
                                ),
                            },
                            {
                                accessor: 'location',
                                title: 'Location',
                                width:"250px",
                                sortable: true,
                                render: ({ location}) => (
                                    <div className="truncate  ">
                                        {location}
                                    </div>
                                ),
                            },
                            { accessor: 'start_date', title: 'Start Date', sortable: true },
                            { accessor: 'end_date', title: 'End Date', sortable: true },
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
                                                        setEventId(id);
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

export default EventsList;
