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
import { Button } from '../../components/atoms';
import InputCustom from '../../components/atoms/InputCustom';
// import AddCategory from './AddCategory';
import Tippy from '@tippyjs/react';
import { Form, Formik } from 'formik';
import UploadImage from '../../components/atoms/UploadImage';


type AllCategories = {
    [x: string]: string;
};
type InitialValues_TP = {
    [x: string]: string;
};
const CategoriesList = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Categories Table'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    interface Category {
        id: number;
        image: string;
        name: string;
        slug: string;

    }
    const [idCategory, setCategoryId] = useState<any>();

    // const cols = useMemo<ColumnDef<AllCategories>[]>(
    //     () => [
    //         {
    //             header: 'ID',
    //             cell: (info:any) => info.renderValue(),
    //             accessorKey: 'id',
    //         },
    //         {
    //             header: 'Category',
    //             cell: (info:any) => (
    //                 <div className=' inline-flex  items-center'>
    //                      <div>
    //                         <img className='rounded-full w-[30px] h-[30px] ' src={info?.row?.original?.image}  />
    //                      </div>
    //                      <div className='ml-2  truncate '>
    //                        {info?.row?.original?.name }
    //                     </div>
    //                 </div>
    //             ),
    //             accessorKey: 'name',
    //         },


    //          {
    //             header: 'Slug',
    //             cell: (info:any) => info.renderValue(),
    //             accessorKey: 'slug',
    //         },

    //         {
    //             header: `Action`,
    //             cell: (info:any) => (
    //                 <div className="flex gap-2">
    //                     <div>
    //                         <SvgDelete

    //                             action={() => {
    //                                 setCategoryId(info.row.original.id);
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
        data: Categories,
        isLoading,
        isRefetching,
        isFetching,
        refetch,
    } = useFetch<AllCategories[]>({
        endpoint: `api/dashboard/category/index`,
        queryKey: [`All-Categories`],
    });

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    //@ts-ignore
    const [initialRecords, setInitialRecords] = useState<any>(sortBy(Categories?.data?.categories, 'id'));
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

        setInitialRecords(sortBy(Categories?.data?.categories, 'id'));
        //@ts-ignore
    }, [Categories?.data?.categories]);

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

            return Categories?.data?.categories.filter((item: any) => {
                return item.name.toLowerCase().includes(search.toLowerCase()) ;
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

    const initialValues: InitialValues_TP = {
        //@ts-ignore
        name: !resetForm ? editData?.name : '',
        //@ts-ignore
        image: !resetForm ? editData?.image : '',
        //@ts-ignore
        slug: !resetForm ? editData?.slug : '',
    };



     // post data
     const { mutate, isLoading: postLoading } = useMutate({
        mutationKey: ['categories/id'],
        endpoint: `api/dashboard/category/store`,
        onSuccess: (data: any) => {
            queryClient.refetchQueries(['All-Categories']);
            Swal.fire({ title: 'Added!', text: 'Category has been added.', icon: 'success', customClass: 'sweet-alerts' });
            // setShowCustomizer(false);
            setOpen(false);

        },
        onError: (err: any) => {
            Swal.fire({ title: 'Category Can not be added!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
            console.log('error', err);
        },
        formData: true,
    });
    const { mutate: update, isLoading: loadingUpdate } = useMutate({
        mutationKey: ['categories/id'],
        //@ts-ignore
        endpoint: `api/dashboard/category/update/${editData?.id}`,
        onSuccess: (data: any) => {
            queryClient.refetchQueries(['All-Categories']);
            Swal.fire({ title: 'Updated!', text: 'Category has been updated.', icon: 'success', customClass: 'sweet-alerts' });
            // setShowCustomizer(false);
            setOpen(false);

        },
        onError: (err: any) => {
            Swal.fire({ title: 'Category Can not be Updated!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
        },
        formData: true,
    });


    const { mutate: deleteCategory } = useMutate({
        mutationKey: [`categories/id/${idCategory}`],
        endpoint: `api/dashboard/category/delete/${idCategory?.id}`,
        onSuccess: (data: any) => {
            console.log('done');
            Swal.fire({ title: 'Deleted!', text: 'Category has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
            queryClient.refetchQueries(['api/dashboard/category/index']);
            refetch();
        },
        onError: (err: any) => {
            console.log('error', err);
            Swal.fire({ title: 'Sorry!', text: 'Category can not be Deleted .', icon: 'error', customClass: 'sweet-alerts' });
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
                    deleteCategory(id?.id);
                }
            });
        }
    };

    const { mutate:deleteBulk  } = useMutate({
        mutationKey: ['categories/id'],
        endpoint: `api/dashboard/category/bulk/delete`,
        onSuccess: (data: any) => {
            console.log('done');
            Swal.fire({ title: 'Deleted!', text: 'Categories have been deleted.', icon: 'success', customClass: 'sweet-alerts' });
            queryClient.refetchQueries(['api/dashboard/category/index']);
            refetch();
            setSelectedRecords([])
        },
        onError: (err: any) => {
            Swal.fire({ title: 'Categories have not be deleted!', text: `${err.response.data.message}`, icon: 'error', customClass: 'sweet-alerts' });
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
        <div className='grid grid-cols-12 gap-5'>

        <div className="panel lg:col-span-8 col-span-12">

            <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 className="font-semibold text-lg dark:text-white-light">All Categories</h5>
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
                                { accessor: 'id', title: 'ID', sortable: true ,width:'80px'},
                                {
                                    accessor: 'name',
                                    title: 'Category',
                                    sortable: true,
                                    render: ({ name }:any) => (
                                        <div className="flex items-center w-max">
                                            <div>{name}</div>
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
                                                        setCategoryId(id);
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
        <div className='panel lg:col-span-4 col-span-12'>
        <div className='flex justify-between items-center'>
        <h6 className="font-semibold text-lg dark:text-white-light py-2">{resetForm ? 'Add Category' : 'Edit Category'}</h6>
        {!resetForm?
             //@ts-ignore
            <Button variant='primary' className='px-2 py-1' onClick={()=>{setResetForm(true)}}>Add New Category</Button>
            :
            null
        }
        </div>
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

                <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5">
                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                        <label htmlFor="name">Name</label>
                        <InputCustom type="text" name="name" />
                    </div>
                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                        <label htmlFor="content">Slug</label>
                        <InputCustom  name="slug" />
                    </div>
                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                       <label htmlFor="image">Image</label>
                        <UploadImage name="image" updateData={editData} resetForm={resetForm} />
                    </div>
                    <div className="lg:col-span-12 max-sm:col-span-1 ">
                        <Button variant='primary' type='submit' >
                            submit
                        </Button>
                    </div>
                </div>
              </Form>
                )}
            </Formik>
        </div>
        </div>
    );
};

export default CategoriesList;



// import { useQueryClient } from '@tanstack/react-query';
// import { ColumnDef } from '@tanstack/react-table';
// import { t } from 'i18next';
// import sortBy from 'lodash/sortBy';
// import { DataTable, DataTableSortStatus } from 'mantine-datatable';
// import { useEffect, useMemo, useState } from 'react';
// import { GiCancel } from 'react-icons/gi';
// import { useDispatch, useSelector } from 'react-redux';
// import Select from 'react-select';
// import Swal from 'sweetalert2';
// import { EditIcon } from '../../components/atoms/icons';
// import { Table } from '../../components/template/tantable/Table';
// import useFetch from '../../hooks/UseFetch';
// import { useMutate } from '../../hooks/UseMutate';
// import { IRootState } from '../../store';
// import { setPageTitle } from '../../store/themeConfigSlice';
// import { Loader } from '@mantine/core';
// import Loading from '../../components/atoms/loading';
// import { SvgDelete } from '../../components/atoms/icons/SvgDelete';
// import AddCategory from './AddCategory';
// import Tippy from '@tippyjs/react';


// type AllCategories = {
//     [x: string]: string;
// };
// const CategoriesList = () => {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(setPageTitle('Categories Table'));
//     });
//     const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
//     interface Category {
//         id: number;
//         image: string;
//         name: string;
//         slug: string;

//     }
//     const [idCategory, setCategoryId] = useState<any>();

//     // const cols = useMemo<ColumnDef<AllCategories>[]>(
//     //     () => [
//     //         {
//     //             header: 'ID',
//     //             cell: (info:any) => info.renderValue(),
//     //             accessorKey: 'id',
//     //         },
//     //         {
//     //             header: 'Category',
//     //             cell: (info:any) => (
//     //                 <div className=' inline-flex  items-center'>
//     //                      <div>
//     //                         <img className='rounded-full w-[30px] h-[30px] ' src={info?.row?.original?.image}  />
//     //                      </div>
//     //                      <div className='ml-2  truncate '>
//     //                        {info?.row?.original?.name }
//     //                     </div>
//     //                 </div>
//     //             ),
//     //             accessorKey: 'name',
//     //         },


//     //          {
//     //             header: 'Slug',
//     //             cell: (info:any) => info.renderValue(),
//     //             accessorKey: 'slug',
//     //         },

//     //         {
//     //             header: `Action`,
//     //             cell: (info:any) => (
//     //                 <div className="flex gap-2">
//     //                     <div>
//     //                         <SvgDelete

//     //                             action={() => {
//     //                                 setCategoryId(info.row.original.id);
//     //                                 showAlert(10, info.row.original.id);
//     //                             }}
//     //                         />
//     //                     </div>
//     //                     <div>
//     //                         <EditIcon
//     //                             action={() => {
//     //                                 setOpen(true);
//     //                                 //@ts-ignore
//     //                                 setEditData(info.row.original);
//     //                                 setResetForm(false);
//     //                             }}
//     //                         />
//     //                     </div>
//     //                 </div>
//     //             ),
//     //             accessorKey: 'join',
//     //         },
//     //     ],
//     //     []
//     // );

//     const {
//         data: Categories,
//         isLoading,
//         isRefetching,
//         isFetching,
//         refetch,
//     } = useFetch<AllCategories[]>({
//         endpoint: `api/dashboard/category/index`,
//         queryKey: [`All-Categories`],
//     });

//     const [page, setPage] = useState(1);
//     const PAGE_SIZES = [10, 20, 30, 50, 100];
//     const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
//     //@ts-ignore
//     const [initialRecords, setInitialRecords] = useState<any>(sortBy(Categories?.data?.categories, 'id'));
//     const [recordsData, setRecordsData] = useState(initialRecords);
//     const [showCustomizer, setShowCustomizer] = useState(false);
//     const [search, setSearch] = useState('');
//     const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
//     const [selectValue, setSelectValue] = useState<any>('');
//     const [editData, setEditData] = useState(false);
//     const [resetForm, setResetForm] = useState(true);
//     const [selectedRecords, setSelectedRecords] = useState<any>([]);
//     const [open, setOpen] = useState(false);

//     useEffect(() => {
//         //@ts-ignore

//         setInitialRecords(sortBy(Categories?.data?.categories, 'id'));
//         //@ts-ignore
//     }, [Categories?.data?.categories]);

//     useEffect(() => {
//         setPage(1);
//     }, [pageSize]);

//     useEffect(() => {
//         const from = (page - 1) * pageSize;
//         const to = from + pageSize;
//         setRecordsData([...initialRecords.slice(from, to)]);
//     }, [page, pageSize, initialRecords]);


//     // filter
//     // useEffect(() => {
//     //     if (selectValue !== 'Filter Role') {
//     //         setInitialRecords(() => {
//     //             //@ts-ignore

//     //             return Users?.data?.all_users.filter((item: any) => {
//     //                 return item.role_id == selectValue;
//     //             });
//     //         });
//     //     } else {
//     //         //@ts-ignore

//     //         setInitialRecords(Users?.data?.all_users);
//     //     }
//     //     // eslint-disable-next-line react-hooks/exhaustive-deps
//     // }, [selectValue]);

//     //search
//     useEffect(() => {
//         setInitialRecords(() => {
//             //@ts-ignore

//             return Categories?.data?.categories.filter((item: any) => {
//                 return item.name.toLowerCase().includes(search.toLowerCase()) ;
//             });
//         });
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [search]);

//     useEffect(() => {
//         const data = sortBy(initialRecords, sortStatus.columnAccessor);
//         setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
//         setPage(1);
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [sortStatus]);
//     const queryClient = useQueryClient();

//     const { mutate: deleteCategory } = useMutate({
//         mutationKey: [`categories/id/${idCategory}`],
//         endpoint: `api/dashboard/category/delete/${idCategory?.id}`,
//         onSuccess: (data: any) => {
//             console.log('done');
//             Swal.fire({ title: 'Deleted!', text: 'Category has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
//             queryClient.refetchQueries(['api/dashboard/category/index']);
//             refetch();
//         },
//         onError: (err: any) => {
//             console.log('error', err);
//             Swal.fire({ title: 'Sorry!', text: 'Category can not be Deleted .', icon: 'error', customClass: 'sweet-alerts' });
//         },
//         method: 'delete',
//         formData: false,
//     });

//     const showAlert = async (type: number, id: any) => {
//         if (type === 10) {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Are you sure?',
//                 text: "You won't be able to revert this!",
//                 showCancelButton: true,
//                 confirmButtonText: 'Delete',
//                 padding: '2em',
//                 customClass: 'sweet-alerts',
//             }).then((result) => {
//                 if (result.value) {
//                     deleteCategory(id?.id);
//                 }
//             });
//         }
//     };

//     return (
//         <div className="panel">
//             <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
//                 <h5 className="font-semibold text-lg dark:text-white-light">All Categories</h5>
//                 <div className="lg:ltr:ml-auto lg:rtl:mr-auto min-md:ltr:mr-auto  min-md:rtl:ml-auto">
//                     <input type="text" className="form-input w-[100%]" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
//                 </div>
//                 <div>
//                     <button
//                         type="button"
//                         className="bg-primary font-semibold hover:bg-blue-500 max-sm:w-[100%] max-md:w-[100%] text-white py-2 px-5 rounded-lg cursor-pointer"
//                         onClick={() => {
//                             setOpen(true), setResetForm(true);
//                         }}
//                     >
//                         Add Category
//                     </button>

//                     <AddCategory
//                         resetForm={resetForm}
//                         setOpen={setOpen}
//                         open={open}
//                         setResetForm={setResetForm}
//                         categoryData={editData}
//                         showCustomizer={showCustomizer}
//                         setShowCustomizer={setShowCustomizer}
//                     />
//                 </div>
//             </div>
//             <div className="datatables">
//                 {isLoading || isRefetching ? (
//                     <Loading />
//                 ) : (
//                     <div className="datatables">
//                     <DataTable
//                         highlightOnHover
//                         className={`${isRtl ? 'whitespace-nowrap table-hover' : 'whitespace-nowrap table-hover'}`}
//                         records={recordsData}
//                         columns={[
//                                 { accessor: 'id', title: 'ID', sortable: true ,width:'80px'},
//                                 {
//                                     accessor: 'name',
//                                     title: 'Category',
//                                     sortable: true,
//                                     render: ({ name }:any) => (
//                                         <div className="flex items-center w-max">
//                                             <div>{name}</div>
//                                         </div>
//                                     ),
//                                 },
//                                 { accessor: 'slug', title: 'Slug', sortable: true },
//                                 {
//                                     accessor: 'action',
//                                     title: 'Action',
//                                     titleClassName: '!text-center',
//                                     render: (id) => (
//                                         <div className="flex items-center w-max mx-auto gap-2">
//                                             <Tippy >
//                                                 <EditIcon
//                                                 action={() => {
//                                                     setOpen(true);
//                                                     //@ts-ignore

//                                                     setEditData(id);
//                                                     setResetForm(false);
//                                                 }}
//                                                />
//                                             </Tippy>
//                                             <Tippy >
//                                             <div>
//                                                 <SvgDelete
//                                                     action={() => {
//                                                         setCategoryId(id);
//                                                         showAlert(10, id);
//                                                     }}
//                                                 />
//                                             </div>
//                                             </Tippy>

//                                         </div>
//                                     ),
//                                 },
//                         ]}
//                         totalRecords={initialRecords.length}
//                         recordsPerPage={pageSize}
//                         page={page}
//                         onPageChange={(p) => setPage(p)}
//                         recordsPerPageOptions={PAGE_SIZES}
//                         onRecordsPerPageChange={setPageSize}
//                         sortStatus={sortStatus}
//                         onSortStatusChange={setSortStatus}
//                         selectedRecords={selectedRecords}
//                         onSelectedRecordsChange={setSelectedRecords}
//                         minHeight={200}
//                         paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
//                     />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CategoriesList;
