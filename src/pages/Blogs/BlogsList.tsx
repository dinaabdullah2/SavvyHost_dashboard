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
import AddBlog from './AddBlog';
import Tippy from '@tippyjs/react';



type AllBlogs = {
    [x: string]: string;
};
const BlogsList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Blogs Table'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    interface Blog {
        id: number;
        image: string;
        title: string;
        status: string;
        searchable:any;
        category:any;
    }
    const [idBlog, setBlogId] = useState<any>();

    // const cols = useMemo<ColumnDef<AllBlogs>[]>(
    //     () => [
    //         {
    //             header: 'ID',
    //             cell: (info:any) => info.renderValue(),
    //             accessorKey: 'id',
    //         },
    //         {
    //             header: 'Title',
    //             cell: (info:any) => info.renderValue(),

    //             accessorKey: 'title',
    //         },

    //         {
    //             header: 'Status',
    //             cell: (info:any) => info.renderValue(),
    //             accessorKey: 'status',
    //         },
    //         {
    //             header: 'Category',
    //             cell: (info:any) => (
    //                <div>{info?.row?.original?.category?.name}</div>
    //             ),
    //             accessorKey: 'category',
    //         },
    //         {
    //             header: 'Searchable',
    //             cell: (info:any) => (
    //                 <div>
    //                   {info.row.original.searchable == 1 ? "Yes" : 'No' }
    //                 </div>
    //             ),
    //             accessorKey: 'searchable',
    //         },
    //         {
    //             header: `Action`,
    //             cell: (info:any) => (
    //                 <div className="flex gap-2">
    //                     <div>
    //                         <SvgDelete

    //                             action={() => {
    //                                 setBlogId(info.row.original.id);
    //                                 showAlert(10, info.row.original.id);
    //                             }}
    //                         />
    //                     </div>
    //                     <div>
    //                         <EditIcon
    //                             action={() => {
    //                                 setOpen(true);
    //                                 //@ts-ignore
    //                                 setEditData(info.row.original);
    //                                 setResetForm(false);
    //                             }}
    //                         />
    //                     </div>
    //                 </div>
    //             ),
    //             accessorKey: 'join',
    //         },
    //     ],
    //     []
    // );

    const {
        data: Blogs,
        isLoading,
        isRefetching,
        isFetching,
        refetch,
    } = useFetch<AllBlogs[]>({
        endpoint: `api/dashboard/blog`,
        queryKey: [`All-Blogs`],
    });

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    //@ts-ignore
    const [initialRecords, setInitialRecords] = useState<any>(sortBy(Blogs?.data?.blogs, 'id'));
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

        setInitialRecords(sortBy(Blogs?.data?.blogs, 'id'));
        //@ts-ignore
    }, [Blogs?.data?.blogs]);

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

            return Blogs?.data?.blogs.filter((item: any) => {
                return item.title.toLowerCase().includes(search.toLowerCase())
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

    const { mutate: deleteBlog } = useMutate({
        mutationKey: [`blogs/id/${idBlog}`],
        endpoint: `api/dashboard/blog/${idBlog?.id}`,
        onSuccess: (data: any) => {
            console.log('done');
            Swal.fire({ title: 'Deleted!', text: 'Blog has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
            queryClient.refetchQueries(['api/dashboard/blog']);
            refetch();
        },
        onError: (err: any) => {
            console.log('error', err);
            Swal.fire({ title: 'Sorry!', text: 'Blog can not be Deleted .', icon: 'error', customClass: 'sweet-alerts' });
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
                    deleteBlog(id?.id);
                }
            });
        }
    };


    const { mutate:deleteBulk  } = useMutate({
        mutationKey: ['blogs/id'],
        endpoint: `api/dashboard/blog/bulk/delete`,
        onSuccess: (data: any) => {
            console.log('done');
            Swal.fire({ title: 'Deleted!', text: 'Blogs have been deleted.', icon: 'success', customClass: 'sweet-alerts' });
            queryClient.refetchQueries(['api/dashboard/blog']);
            refetch();
            setSelectedRecords([])
        },
        onError: (err: any) => {
            Swal.fire({ title: 'Blogs have not be deleted!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
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
                <h5 className="font-semibold text-lg dark:text-white-light">All Blogs</h5>
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
                        Add Blog
                    </button>

                    <AddBlog
                        resetForm={resetForm}
                        setOpen={setOpen}
                        open={open}
                        setResetForm={setResetForm}
                        blogData={editData}
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
                            { accessor: 'id', title: 'ID', sortable: true , width:"80px"},
                            {
                                accessor: 'title',
                                title: 'Title',
                                sortable: true,

                            },
                            // { accessor: 'content', title: 'Content', sortable: true },
                            { accessor: 'status',
                              title: 'Status',
                              sortable: true,
                            },
                            {  accessor: 'searchable',
                               title: 'Searchable',
                               sortable: true,
                            render: ({ searchable }:any) => (
                                    <div>{searchable? "Yes":"No"}</div>
                            )},
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
                                                        setBlogId(id);
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

export default BlogsList;
