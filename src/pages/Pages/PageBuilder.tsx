import { IconEdit } from '@tabler/icons-react'
import React from 'react'

const PageBuilder = () => {
  return (
    <div className='px-10 flex '>
        <div className='m-auto w-[80%]'>
              <div className='grid grid-cols-12'>
                  <div className='col-span-12 '>
                     <div className='flex flex-col '>
                         <div className='flex flex-row justify-between bg-white items-center'>
                         <div className="border w-[100%]  border-white-light dark:border-[#1b2e4b] rounded-md mb-3 pb-5">
                                <h5 className="mb-5 w-[100%] text-base font-semibold dark:text-white p-2  border-b  border-white-light">Feature </h5>
                                <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
                                    <div className="lg:col-span-12 max-sm:col-span-1 p-1">
                                        <div className='flex flex-row items-center justify-between w-[100%]  border py-5 px-2  bg-gray-100 '>
                                            <h6>Home Page</h6>
                                            <button>
                                               <IconEdit />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </div>
                     </div>
                  </div>
              </div>
        </div>
    </div>
  )
}

export default PageBuilder
