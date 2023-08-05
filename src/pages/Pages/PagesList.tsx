import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import React from 'react';
import Tippy from '@tippyjs/react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import AddPage from './AddPage';
import EditPage from './EditPage';
import useFetch from '../../hooks/UseFetch';
import axios from 'axios';
import { useMutate } from '../../hooks/UseMutate';
import { useQueryClient } from '@tanstack/react-query';



const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        email: 'carolinejensen@zidant.com',
        dob: '2004-05-28',
        address: {
            street: '529 Scholes Street',
            city: 'Temperanceville',
            zipcode: 5235,
            geo: {
                lat: 23.806115,
                lng: 164.677197,
            },
        },
        phone: '+1 (821) 447-3782',
        isActive: true,
        age: 39,
        company: 'POLARAX',
        role:'user'
    },
    {
        id: 2,
        firstName: 'Celeste',
        lastName: 'Grant',
        email: 'celestegrant@polarax.com',
        dob: '1989-11-19',
        address: {
            street: '639 Kimball Street',
            city: 'Bascom',
            zipcode: 8907,
            geo: {
                lat: 65.954483,
                lng: 98.906478,
            },
        },
        phone: '+1 (838) 515-3408',
        isActive: false,
        age: 32,
        company: 'MANGLO',
        role:'user'
    },
    {
        id: 3,
        firstName: 'Tillman',
        lastName: 'Forbes',
        email: 'tillmanforbes@manglo.com',
        dob: '2016-09-05',
        address: {
            street: '240 Vandalia Avenue',
            city: 'Thynedale',
            zipcode: 8994,
            geo: {
                lat: -34.949388,
                lng: -82.958111,
            },
        },
        phone: '+1 (969) 496-2892',
        isActive: false,
        age: 26,
        company: 'APPLIDECK',
        role:'admin'
    },
    {
        id: 4,
        firstName: 'Daisy',
        lastName: 'Whitley',
        email: 'daisywhitley@applideck.com',
        dob: '1987-03-23',
        address: {
            street: '350 Pleasant Place',
            city: 'Idledale',
            zipcode: 9369,
            geo: {
                lat: -54.458809,
                lng: -127.476556,
            },
        },
        phone: '+1 (861) 564-2877',
        isActive: true,
        age: 21,
        company: 'VOLAX',
        role:'admin'
    },
    {
        id: 5,
        firstName: 'Weber',
        lastName: 'Bowman',
        email: 'weberbowman@volax.com',
        dob: '1983-02-24',
        address: {
            street: '154 Conway Street',
            city: 'Broadlands',
            zipcode: 8131,
            geo: {
                lat: 54.501351,
                lng: -167.47138,
            },
        },
        phone: '+1 (962) 466-3483',
        isActive: false,
        age: 26,
        company: 'ORBAXTER',
        role:'user'
    },
    {
        id: 6,
        firstName: 'Buckley',
        lastName: 'Townsend',
        email: 'buckleytownsend@orbaxter.com',
        dob: '2011-05-29',
        address: {
            street: '131 Guernsey Street',
            city: 'Vallonia',
            zipcode: 6779,
            geo: {
                lat: -2.681655,
                lng: 3.528942,
            },
        },
        phone: '+1 (884) 595-2643',
        isActive: true,
        age: 40,
        company: 'OPPORTECH',
        role:'admin'
    },
    {
        id: 7,
        firstName: 'Latoya',
        lastName: 'Bradshaw',
        email: 'latoyabradshaw@opportech.com',
        dob: '2010-11-23',
        address: {
            street: '668 Lenox Road',
            city: 'Lowgap',
            zipcode: 992,
            geo: {
                lat: 36.026423,
                lng: 130.412198,
            },
        },
        phone: '+1 (906) 474-3155',
        isActive: true,
        age: 24,
        company: 'GORGANIC',
        role:'user'
    },
    {
        id: 8,
        firstName: 'Kate',
        lastName: 'Lindsay',
        email: 'katelindsay@gorganic.com',
        dob: '1987-07-02',
        address: {
            street: '773 Harrison Avenue',
            city: 'Carlton',
            zipcode: 5909,
            geo: {
                lat: 42.464724,
                lng: -12.948403,
            },
        },
        phone: '+1 (930) 546-2952',
        isActive: true,
        age: 24,
        company: 'AVIT',
        role:'admin'
    },
    {
        id: 9,
        firstName: 'Marva',
        lastName: 'Sandoval',
        email: 'marvasandoval@avit.com',
        dob: '2010-11-02',
        address: {
            street: '200 Malta Street',
            city: 'Tuskahoma',
            zipcode: 1292,
            geo: {
                lat: -52.206169,
                lng: 74.19452,
            },
        },
        phone: '+1 (927) 566-3600',
        isActive: false,
        age: 28,
        company: 'QUILCH',
        role:'user'
    },
    {
        id: 10,
        firstName: 'Decker',
        lastName: 'Russell',
        email: 'deckerrussell@quilch.com',
        dob: '1994-04-21',
        address: {
            street: '708 Bath Avenue',
            city: 'Coultervillle',
            zipcode: 1268,
            geo: {
                lat: -41.550295,
                lng: -146.598075,
            },
        },
        phone: '+1 (846) 535-3283',
        isActive: false,
        age: 27,
        company: 'MEMORA',
        role:'admin'
    },
    {
        id: 11,
        firstName: 'Odom',
        lastName: 'Mills',
        email: 'odommills@memora.com',
        dob: '2010-01-24',
        address: {
            street: '907 Blake Avenue',
            city: 'Churchill',
            zipcode: 4400,
            geo: {
                lat: -56.061694,
                lng: -130.238523,
            },
        },
        phone: '+1 (995) 525-3402',
        isActive: true,
        age: 34,
        company: 'ZORROMOP',
        role:'user'
    },
    {
        id: 12,
        firstName: 'Sellers',
        lastName: 'Walters',
        email: 'sellerswalters@zorromop.com',
        dob: '1975-11-12',
        address: {
            street: '978 Oakland Place',
            city: 'Gloucester',
            zipcode: 3802,
            geo: {
                lat: 11.732587,
                lng: 96.118099,
            },
        },
        phone: '+1 (830) 430-3157',
        isActive: true,
        age: 28,
        company: 'ORBOID',
        role:'user'
    },
    {
        id: 13,
        firstName: 'Wendi',
        lastName: 'Powers',
        email: 'wendipowers@orboid.com',
        dob: '1979-06-02',
        address: {
            street: '376 Greenpoint Avenue',
            city: 'Elliott',
            zipcode: 9149,
            geo: {
                lat: -78.159578,
                lng: -9.835103,
            },
        },
        phone: '+1 (863) 457-2088',
        isActive: true,
        age: 31,
        company: 'SNORUS',
        role:'user'
    },

    {
        id: 14,
        firstName: 'Wendi',
        lastName: 'Powers',
        email: 'wendipowers@orboid.com',
        dob: '1979-06-02',
        address: {
            street: '376 Greenpoint Avenue',
            city: 'Elliott',
            zipcode: 9149,
            geo: {
                lat: -78.159578,
                lng: -9.835103,
            },
        },
        phone: '+1 (863) 457-2088',
        isActive: true,
        age: 31,
        company: 'SNORUS',
        role:'user'
    },
    {
        id: 15,
        firstName: 'Wendi',
        lastName: 'Powers',
        email: 'wendipowers@orboid.com',
        dob: '1979-06-02',
        address: {
            street: '376 Greenpoint Avenue',
            city: 'Elliott',
            zipcode: 9149,
            geo: {
                lat: -78.159578,
                lng: -9.835103,
            },
        },
        phone: '+1 (863) 457-2088',
        isActive: true,
        age: 31,
        company: 'SNORUS',
        role:'user'
    },
    {
        id: 16,
        firstName: 'Wendi',
        lastName: 'Powers',
        email: 'wendipowers@orboid.com',
        dob: '1979-06-02',
        address: {
            street: '376 Greenpoint Avenue',
            city: 'Elliott',
            zipcode: 9149,
            geo: {
                lat: -78.159578,
                lng: -9.835103,
            },
        },
        phone: '+1 (863) 457-2088',
        isActive: true,
        age: 31,
        company: 'SNORUS',
        role:'user'
    },
];

const options = [
    { value: 'Filter Publish', label: 'All' },
    { value: 1, label: 'Publish' },
    { value: 0, label: 'Draft' },

];


const PagesList = () => {
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(setPageTitle('Pages Table'));
    //     axios.get(`https://dashboard.savvyhost.io/dashboard/page/index`, {
    //         headers: {

    //           "Content-Type": "multipart/form-data"
    //         }
    //       })
    //         .then(response => {
    //           console.log(response,"feee")

    //         }
    //         ).catch((err) => {

    //             console.log(err,'fee')
    //          })
    // });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;


    interface Page {
        id: number;
        logo: string;
        name: string;
        content: string;
        role_id: number;
        publish:boolean;
        searchable:boolean

        // Add more properties if needed...
    }

    const {
        data: Pages,
        isLoading,
        isRefetching,
        isFetching,
        refetch,
    } = useFetch<{
        data: {
            pages: Page[];
        };
    }>({
        endpoint: `api/dashboard/page/index`,
        queryKey: [`All-Pages`],
    });
    console.log('🚀 ~ file: PagesList.tsx:49 ~ isFetching:', isFetching);
    console.log('🚀 ~ file: PagesList.tsx:49 ~ isRefetching:', isRefetching);
    console.log('🚀 ~ file: PagesList.tsx:49 ~ isLoading:', isLoading);
    console.log('🚀 ~ file: PagesList.tsx:49 ~ Refetching:',Pages?.data?.pages);



    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<any>(sortBy(Pages?.data?.pages, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    const [selectValue,setSelectValue]=useState<any>('')
    const [pageData, setPageData] = useState<any>();

    useEffect(() => {
        setInitialRecords(sortBy(Pages?.data?.pages, 'id'));
    }, [Pages?.data?.pages]);


    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        if(selectValue !== 'Filter Publish'){
        setInitialRecords(() => {
            return Pages?.data?.pages.filter((item:any) => {
                return (
                    item.publish == selectValue
                );
            });
        })}else{
            setInitialRecords(Pages?.data?.pages)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectValue]);



    useEffect(() => {
        setInitialRecords(() => {
            return Pages?.data?.pages.filter((item:any) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.name.toLowerCase().includes(search.toLowerCase())

                );
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

    const htmlString: string = "<p>scsdcdsc</p>";
const parser: DOMParser = new DOMParser();
const parsedHTML: Document = parser.parseFromString(htmlString, "text/html");
const htmlElement: HTMLElement = parsedHTML.body.firstChild as HTMLElement;

console.log(htmlElement,'<p>');

const queryClient = useQueryClient();

const [idPage, setPageId] = useState<any>();
const { mutate: deletePage } = useMutate({
    mutationKey: [`Pages/id/{id}`],
    endpoint: `api/dashboard/page/delete/${idPage?.id}`,
    onSuccess: (data: any) => {
        console.log('done');
        Swal.fire({ title: 'Deleted!', text: 'Your Page has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
        queryClient.refetchQueries(['api/dashboard/category/index']);
        refetch();
    },
    onError: (err: any) => {
        console.log('error', err);
        Swal.fire({ title: 'Sorry!', text: 'Page can not be Deleted .', icon: "error", customClass: 'sweet-alerts' });
    },
    method: 'delete',
    formData: false,
});

const showAlert = async (type: number,id :any) => {
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
                console.log(id,'id')
                deletePage(id)

                // axios.delete(`https://dashboard.savvyhost.io/api/user/delete/${id.id}`, {
                //     headers: {
                //       "Content-Type": "multipart/form-data"
                //     }
                //   }).then(response => {
                //       console.log(response,"deleted")
                //       Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
                //     }
                //     ).catch((err) => {
                //         Swal.fire({ title: 'Sorry!', text: 'User can not be Deleted .', icon: "error", customClass: 'sweet-alerts' });
                //         console.log(err,'err')
                //      })
                //delete

            }
        });
    }
}

    return (
        <div className="panel">
            <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 className="font-semibold text-lg dark:text-white-light">All Pages</h5>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div>
                 <Select className='w-[200px]' defaultValue={options[0]} options={options} onChange={(event)=>{setSelectValue(event?.value)}} isSearchable={false} />
                </div>
                <div>
                <button
                    type="button"
                    className="bg-primary font-semibold hover:bg-blue-500 text-white py-2 px-5 rounded-lg cursor-pointer"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                   Add Page
                </button>
                   <AddPage  refetch={refetch}  pageData={pageData} showAddForm={showAddForm} setShowAddForm={setShowAddForm} />
                   <EditPage showEditForm={showEditForm} setShowEditForm={setShowEditForm} />
                </div>
            </div>
            <div className="datatables">
                <DataTable
                    highlightOnHover
                    className={`${isRtl ? 'whitespace-nowrap table-hover' : 'whitespace-nowrap table-hover'}`}
                    records={recordsData}
                    columns={[
                        { accessor: 'id', title: 'ID', sortable: true , width:"80px"},
                        {
                            accessor: 'name',
                            title: 'Page',
                            sortable: true,
                            render: ({ name, logo }:any) => (
                                <div className="flex items-center w-max">
                                    <img className="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 object-cover" src={logo} alt="" />
                                    <div>{name}</div>
                                </div>
                            ),
                        },

                        // { accessor: 'content', title: 'Content', sortable: true },
                        { accessor: 'publish',
                          title: 'Publish',
                          sortable: true,
                          render: ({ publish }:any) => (
                                <div>{publish? "Publish":"Draft"}</div>

                        )},
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
                                        <button type="button" className="" onClick={() => {
                                            setShowAddForm(!showAddForm)
                                            setPageData(id)
                                        }}>
                                            <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-700">
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
                                    <Tippy >
                                      <button type="button" className=""  onClick={() => {
                                                showAlert(10, id);
                                                setPageId(id);
                                            }}>
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
}

export default PagesList

